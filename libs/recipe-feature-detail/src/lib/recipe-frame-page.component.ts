import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { recipeDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { PageModule } from '@marmicode/shared-ui';
import { RxState, select } from '@rx-angular/state';
import { combineLatest } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { FrameModule } from '@marmicode/recipe-ui';
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
        [frames]="frames"
        [recipeSlug]="recipeSlug$ | async"
        [currentFrameIndex]="currentFrameIndex$ | async"
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
  currentFrame$ = this._state.select(
    map(({ currentFrameSlug, recipe }) => {
      if (recipe == null) {
        return null;
      }

      return (
        recipe.frames.find((frame) => frame.slug === currentFrameSlug) ??
        recipe.frames[0]
      );
    })
  );
  currentFrameIndex$ = combineLatest([this.frames$, this.currentFrame$]).pipe(
    map(([frames, currentFrame]) => frames.indexOf(currentFrame))
  );
  currentFrameTitle$ = this.currentFrame$.pipe(
    select(map((frame) => frame?.title))
  );
  type$ = this.recipe$.pipe(select(pluck('type')));
  title$ = this.recipe$.pipe(select(pluck('title')));

  constructor(
    private _recipeRepository: RecipeRepository,
    private _route: ActivatedRoute,
    private _state: RxState<{ recipe: Recipe; currentFrameSlug: string }>
  ) {
    this._state.connect(
      'recipe',
      this._route.paramMap.pipe(
        map((params) => params.get(recipeDetailRouterHelper.RECIPE_SLUG_PARAM)),
        switchMap((recipeSlug) => this._recipeRepository.getRecipe(recipeSlug))
      )
    );
    this._state.connect(
      'currentFrameSlug',
      this._route.paramMap.pipe(
        map((params) => params.get(recipeDetailRouterHelper.FRAME_SLUG_PARAM))
      )
    );
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
