import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RxState, select } from '@rx-angular/state';
import { map, pluck } from 'rxjs/operators';
import { RecipeFrameModule } from './recipe-frame.component';
import { Recipe, RecipeRepository } from './recipe-repository.service';
import { RecipeTimelineModule } from './recipe-timeline.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-detail',
  template: `<mc-recipe-frame
      [frame]="selectedFrame$ | async"
    ></mc-recipe-frame>
    <mc-recipe-timeline
      [frames]="frames$ | async"
      [recipeSlug]="recipeSlug$ | async"
      [selectedFrameIndex]="selectedFrameIndex$ | async"
    ></mc-recipe-timeline> `,
  providers: [RxState],
})
export class RecipeDetailComponent {
  recipe$ = this._state.select('recipe');
  recipeSlug$ = this.recipe$.pipe(select(map((recipe) => recipe.slug)));
  frames$ = this.recipe$.pipe(select(map((recipe) => recipe.frames)));
  selectedFrameIndex$ = this._state.select('selectedFrameIndex');
  selectedFrame$ = this._state.select(
    map((state) => state.recipe.frames[state.selectedFrameIndex])
  );

  constructor(
    private _recipeRepository: RecipeRepository,
    private _state: RxState<{ recipe: Recipe; selectedFrameIndex: number }>
  ) {
    this._state.set({ selectedFrameIndex: 1 });
    this._state.connect('recipe', this._recipeRepository.getRecipe());
  }
}

@NgModule({
  declarations: [RecipeDetailComponent],
  exports: [RecipeDetailComponent],
  imports: [CommonModule, RecipeFrameModule, RecipeTimelineModule],
})
export class RecipeDetailModule {}
