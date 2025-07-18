import { CommonModule, NgIf, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  NgModule,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockGroupComponent } from '@marmicode/block/ui';
import { ResourceTitleBannerComponent } from '@marmicode/resource/api';
import { recipeDetailRouterHelper } from '@marmicode/shared/router-helpers';
import {
  createBasicPageInfo,
  PageComponent,
  PageModule,
} from '@marmicode/shared/ui';
import { RxState } from '@rx-angular/state';
import { select } from '@rx-angular/state/selections';
import { PushPipe } from '@rx-angular/template/push';
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
import { Frame, Recipe, RecipeRepository } from './recipe-repository.service';
import {
  RecipeTimelineComponent,
  RecipeTimelineModule,
} from './recipe-timeline.component';
import {
  SlideAnimationDirective,
  SlideAnimationModule,
} from './slide-animation.directive';
import { SwipeDirective, SwipeModule } from './swipe.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-frame-page',
  template: `
    <mc-page [info]="pageInfo$ | push" class="page">
      <!-- Swipable content. -->
      <div
        [slideIndex]="currentFrameIndex$ | push"
        (swipeLeft)="swipeLeft$.next()"
        (swipeRight)="swipeRight$.next()"
        class="swipable-content"
        mcSlideAnimation
        mcSwipe
      >
        <!-- Recipe's title. -->
        <mc-resource-title-banner
          *ngIf="title$ | push as title"
          [resourceType]="type$ | push"
          [title]="title"
          [subtitle]="currentFrameTitle$ | push"
        ></mc-resource-title-banner>

        <!-- Frame's blocks with code, text etc... -->
        <mc-block-group
          *ngIf="currentFrame$ | push as currentFrame"
          [blockGroup]="currentFrame"
        ></mc-block-group>
      </div>

      <!-- THE timeline. -->
      <mc-recipe-timeline
        *ngIf="frames$ | push as frames"
        [currentFrameIndex]="currentFrameIndex$ | push"
        [frames]="frames"
        [recipeSlug]="recipeSlug$ | push"
        [nextFrameRoute]="nextFrameRoute$ | push"
      ></mc-recipe-timeline>
    </mc-page>
  `,
  styles: [
    `
      .page {
        display: flex;
        flex-direction: column;

        /* Set overflow to hidden to avoid glitches with mcSlideAnimation. */
        overflow: hidden;
      }

      .swipable-content {
        display: flex;
        flex-direction: column;

        /* Forcing flex-basis to auto as fxFlex sets it to 0px
             * and doesn't stretch when content is larger than page. */
        flex: 1 1 auto;
      }
    `,
  ],
  providers: [RxState],
  imports: [
    PageComponent,
    SlideAnimationDirective,
    SwipeDirective,
    NgIf,
    ResourceTitleBannerComponent,
    BlockGroupComponent,
    RecipeTimelineComponent,
    PushPipe,
  ],
})
export class RecipeFramePageComponent {
  recipe$ = this._state.select('recipe');
  recipeSlug$ = this.recipe$.pipe(select(map((recipe) => recipe.slug)));
  frames$ = this.recipe$.pipe(select(map((recipe) => recipe.frames)));
  currentFrameSlug$ = this._state.select('currentFrameSlug');
  currentFrame$ = combineLatest([this.frames$, this.currentFrameSlug$]).pipe(
    map(
      ([frames, currentFrameSlug]) =>
        frames.find((frame) => frame.slug === currentFrameSlug) ?? frames[0],
    ),
  );
  currentFrameIndex$ = combineLatest([this.frames$, this.currentFrame$]).pipe(
    map(([frames, currentFrame]) => frames.indexOf(currentFrame)),
  );
  currentFrameTitle$ = this.currentFrame$.pipe(
    withLatestFrom(this.currentFrameIndex$),
    select(
      map(([frame, index]) => (frame ? `${index} - ${frame.title}` : null)),
    ),
  );
  nextFrameRoute$ = combineLatest([this.frames$, this.currentFrameIndex$]).pipe(
    select(
      map(([frames, currentFrameIndex]) =>
        this._getFrameRouteByIndex({
          frames,
          index: currentFrameIndex + 1,
        }),
      ),
    ),
  );
  previousFrameRoute$ = combineLatest([
    this.frames$,
    this.currentFrameIndex$,
  ]).pipe(
    select(
      map(([frames, currentFrameIndex]) =>
        this._getFrameRouteByIndex({ frames, index: currentFrameIndex - 1 }),
      ),
    ),
  );
  type$ = this.recipe$.pipe(select(pluck('type')));
  title$ = this.recipe$.pipe(select(pluck('title')));

  pageInfo$ = combineLatest([this.title$, this.currentFrameTitle$]).pipe(
    map(([title, currentFrameTitle]) =>
      createBasicPageInfo({
        title: `${title} > ${currentFrameTitle}`,
      }),
    ),
  );

  swipeLeft$ = new Subject<void>();
  swipeRight$ = new Subject<void>();

  /**
   * Stream of pressed keys.
   */
  private _key$ = new Subject<string>();

  constructor(
    private _recipeRepository: RecipeRepository,
    private _route: ActivatedRoute,
    private _router: Router,
    private _state: RxState<{ recipe: Recipe; currentFrameSlug: string }>,
    private _viewportScroller: ViewportScroller,
  ) {
    /**
     * Load recipe.
     */
    this._state.connect(
      'recipe',
      this._route.paramMap.pipe(
        map((params) => params.get(recipeDetailRouterHelper.RECIPE_SLUG_PARAM)),
        distinctUntilChanged(),
        switchMap((recipeSlug) => this._recipeRepository.getRecipe(recipeSlug)),
      ),
    );

    /**
     * Get current frame slug from route.
     */
    this._state.connect(
      'currentFrameSlug',
      this._route.paramMap.pipe(
        map((params) => params.get(recipeDetailRouterHelper.FRAME_SLUG_PARAM)),
      ),
    );

    /**
     * Go to next frame on arrow right or swipe left.
     */
    this._state.hold(
      merge(
        this._key$.pipe(filter((key) => key === 'ArrowRight')),
        this.swipeLeft$,
      ).pipe(withLatestFrom(this.nextFrameRoute$)),
      ([_, route]) => this._tryNavigateToRelativeRoute(route),
    );

    /**
     * Go to previous frame on arrow left or swipe right.
     */
    this._state.hold(
      merge(
        this._key$.pipe(filter((key) => key === 'ArrowLeft')),
        this.swipeRight$,
      ).pipe(withLatestFrom(this.previousFrameRoute$)),
      ([_, route]) => this._tryNavigateToRelativeRoute(route),
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

  private _tryNavigateToRelativeRoute(route: string[]) {
    if (route == null) {
      return;
    }

    this._router
      .navigate(route, { relativeTo: this._route })
      .catch((err) => console.error(err));
  }
}

@NgModule({
  exports: [RecipeFramePageComponent],
  imports: [
    CommonModule,
    PageModule,
    PushPipe,
    RecipeTimelineModule,
    SlideAnimationModule,
    SwipeModule,
    RecipeFramePageComponent,
  ],
})
export class RecipeFramePageModule {}
