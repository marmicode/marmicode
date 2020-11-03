import { CommonModule, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Frame } from '@marmicode/recipe-core';
import { FrameModule } from '@marmicode/recipe-ui';
import { recipeDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { PageModule } from '@marmicode/shared-ui';
import { RxState, select } from '@rx-angular/state';
import { combineLatest, merge, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pluck,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { getRelativeFrameRoute } from './get-relative-frame-route';
import { Recipe, RecipeRepository } from './recipe-repository.service';
import { RecipeTimelineModule } from './recipe-timeline.component';
import { RecipeTitleModule } from './recipe-title.component';
import { SlideAnimationModule } from './slide-animation.directive';
import { SwipeModule } from './swipe.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-frame-page',
  template: `
    <mc-page class="page" fxLayout="column">
      <!-- Swipable content. -->
      <!-- Making this flex with fxFlex -->
      <!-- in order to stick the timeline at the bottom. -->
      <div
        fxFlex
        fxLayout="column"
        mcSlideAnimation
        mcSwipe
        [slideIndex]="currentFrameIndex$ | async"
        (swipeLeft)="swipeLeft$.next()"
        (swipeRight)="swipeRight$.next()"
      >
        <!-- Recipe's title. -->
        <mc-recipe-title
          *ngIf="title$ | async as title"
          [resourceType]="type$ | async"
          [title]="title"
          [frameIndex]="currentFrameIndex$ | async"
          [frameTitle]="currentFrameTitle$ | async"
        ></mc-recipe-title>

        <!-- Frame with code, text etc... blocks. -->
        <mc-frame
          *ngIf="currentFrame$ | async as currentFrame"
          [frame]="currentFrame"
        ></mc-frame>
      </div>

      <!-- THE timeline. -->
      <mc-recipe-timeline
        *ngIf="frames$ | async as frames"
        [currentFrameIndex]="currentFrameIndex$ | async"
        [frames]="frames"
        [recipeSlug]="recipeSlug$ | async"
        [nextFrameRoute]="nextFrameRoute$ | async"
        class="timeline"
      ></mc-recipe-timeline>
    </mc-page>
  `,
  styles: [
    `
      .page {
        /* Set overflow to hidden to avoid glitches with mcSlideAnimation. */
        overflow: hidden;
      }
    `,
  ],
  providers: [RxState],
})
export class RecipeFramePageComponent {
  recipe$ = this._state.select('recipe');
  recipeSlug$ = this.recipe$.pipe(select(map((recipe) => recipe.slug)));
  frames$ = this.recipe$.pipe(select(map((recipe) => recipe.frames)));
  currentFrameSlug$ = this._state.select('currentFrameSlug');
  currentFrame$ = combineLatest([this.frames$, this.currentFrameSlug$]).pipe(
    map(
      ([frames, currentFrameSlug]) =>
        frames.find((frame) => frame.slug === currentFrameSlug) ?? frames[0]
    )
  );
  currentFrameIndex$ = combineLatest([this.frames$, this.currentFrame$]).pipe(
    map(([frames, currentFrame]) => frames.indexOf(currentFrame))
  );
  currentFrameTitle$ = this.currentFrame$.pipe(
    select(map((frame) => frame?.title))
  );
  nextFrameRoute$ = combineLatest([this.frames$, this.currentFrameIndex$]).pipe(
    select(
      map(([frames, currentFrameIndex]) =>
        this._getFrameRouteByIndex({
          frames,
          index: currentFrameIndex + 1,
        })
      )
    )
  );
  previousFrameRoute$ = combineLatest([
    this.frames$,
    this.currentFrameIndex$,
  ]).pipe(
    select(
      map(([frames, currentFrameIndex]) =>
        this._getFrameRouteByIndex({ frames, index: currentFrameIndex - 1 })
      )
    )
  );
  type$ = this.recipe$.pipe(select(pluck('type')));
  title$ = this.recipe$.pipe(select(pluck('title')));

  swipeLeft$ = new Subject();
  swipeRight$ = new Subject();

  /**
   * Stream of pressed keys.
   */
  private _key$ = new Subject<string>();

  constructor(
    private _recipeRepository: RecipeRepository,
    private _route: ActivatedRoute,
    private _router: Router,
    private _state: RxState<{ recipe: Recipe; currentFrameSlug: string }>,
    private _viewportScroller: ViewportScroller
  ) {
    /**
     * Load recipe.
     */
    this._state.connect(
      'recipe',
      this._route.paramMap.pipe(
        map((params) => params.get(recipeDetailRouterHelper.RECIPE_SLUG_PARAM)),
        distinctUntilChanged(),
        switchMap((recipeSlug) => this._recipeRepository.getRecipe(recipeSlug))
      )
    );

    /**
     * Get current frame slug from route.
     */
    this._state.connect(
      'currentFrameSlug',
      this._route.paramMap.pipe(
        map((params) => params.get(recipeDetailRouterHelper.FRAME_SLUG_PARAM))
      )
    );

    /**
     * Go to next frame on arrow right or swipe left.
     */
    this._state.hold(
      merge(
        this._key$.pipe(filter((key) => key === 'ArrowRight')),
        this.swipeLeft$
      ).pipe(
        withLatestFrom(this.nextFrameRoute$),
        switchMap(([_, route]) => this._tryNavigateToRelativeRoute(route))
      )
    );

    /**
     * Go to previous frame on arrow left or swipe right.
     */
    this._state.hold(
      merge(
        this._key$.pipe(filter((key) => key === 'ArrowLeft')),
        this.swipeRight$
      ).pipe(
        withLatestFrom(this.previousFrameRoute$),
        switchMap(([_, route]) => this._tryNavigateToRelativeRoute(route))
      )
    );

    /**
     * Scroll top on frame change.
     */
    this._state.hold(this.currentFrame$.pipe(tap(() => this._scrollTop())));
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    this._key$.next(event.key);
  }

  private _scrollTop() {
    this._viewportScroller.scrollToPosition([0, 0]);
  }

  private _getFrameRouteByIndex({
    frames,
    index,
  }: {
    frames: Frame[];
    index: number;
  }) {
    const frameSlug = frames[index]?.slug;
    return frameSlug ? getRelativeFrameRoute(frameSlug) : null;
  }

  private async _tryNavigateToRelativeRoute(route: string[]) {
    if (route == null) {
      return;
    }
    return this._router.navigate(route, { relativeTo: this._route });
  }
}

@NgModule({
  declarations: [RecipeFramePageComponent],
  exports: [RecipeFramePageComponent],
  imports: [
    CommonModule,
    FlexModule,
    PageModule,
    FrameModule,
    RecipeTimelineModule,
    RecipeTitleModule,
    SlideAnimationModule,
    SwipeModule,
  ],
})
export class RecipeFramePageModule {}
