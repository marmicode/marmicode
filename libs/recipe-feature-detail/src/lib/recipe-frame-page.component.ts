import { CommonModule, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { FrameModule } from '@marmicode/recipe-ui';
import { recipeDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { PageModule } from '@marmicode/shared-ui';
import { RxState, select, selectSlice } from '@rx-angular/state';
import { combineLatest, Subject } from 'rxjs';
import {
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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-frame-page',
  template: `
    <mc-page fxLayout="column">
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

      <!-- Spacer to stick the timeline at the bottom. -->
      <div fxFlex></div>

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
  providers: [RxState],
})
export class RecipeFramePageComponent {
  recipe$ = this._state.select('recipe');
  recipeSlug$ = this.recipe$.pipe(select(map((recipe) => recipe.slug)));
  frames$ = this.recipe$.pipe(select(map((recipe) => recipe.frames)));
  currentFrame$ = this._state.select().pipe(
    select(
      selectSlice(['recipe', 'currentFrameSlug']),
      map(({ recipe, currentFrameSlug }) => {
        if (recipe == null) {
          return null;
        }

        return (
          recipe.frames.find((frame) => frame.slug === currentFrameSlug) ??
          recipe.frames[0]
        );
      })
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
      map(([frames, currentFrameIndex]) => {
        const nextFrame = frames[currentFrameIndex + 1];
        if (nextFrame == null) {
          return null;
        }
        return getRelativeFrameRoute(nextFrame.slug);
      })
    )
  );
  type$ = this.recipe$.pipe(select(pluck('type')));
  title$ = this.recipe$.pipe(select(pluck('title')));

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
     * Go to next frame on arrow right.
     */
    this._state.hold(
      this._key$.pipe(
        filter((key) => key === 'ArrowRight'),
        withLatestFrom(this.nextFrameRoute$),
        map(([_, route]) => route),
        filter((route) => route != null),
        switchMap((route) =>
          this._router.navigate(route, { relativeTo: this._route })
        )
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
  ],
})
export class RecipeFramePageModule {}
