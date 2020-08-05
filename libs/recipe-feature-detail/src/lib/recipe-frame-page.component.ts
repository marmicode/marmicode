import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { recipeDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { PageModule } from '@marmicode/shared-ui';
import { RxState, select } from '@rx-angular/state';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FrameModule } from './frame/frame.component';
import { Recipe, RecipeRepository } from './recipe-repository.service';
import { RecipeTimelineModule } from './recipe-timeline.component';
import { RecipeTitleModule } from './recipe-title.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-frame-page',
  template: `
    <mc-page fxLayout="column">
      <mc-recipe-title
        [resourceType]="type$ | async"
        [title]="title$ | async"
      ></mc-recipe-title>
      <mc-frame [frame]="currentFrame$ | async"></mc-frame>
      <div fxFlex></div>
      <mc-recipe-timeline
        class="timeline"
        [frames]="frames$ | async"
        [recipeSlug]="recipeSlug$ | async"
        [currentFrameIndex]="currentFrameIndex$ | async"
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
    map(
      ({ currentFrameSlug, recipe }) =>
        recipe.frames.find((frame) => frame.slug === currentFrameSlug) ??
        recipe.frames[0]
    )
  );
  currentFrameIndex$ = combineLatest([this.frames$, this.currentFrame$]).pipe(
    map(([frames, currentFrame]) => frames.indexOf(currentFrame))
  );
  type$ = this.recipe$.pipe(select(map((recipe) => recipe.type)));
  title$ = this.recipe$.pipe(select(map((recipe) => recipe.title)));

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
