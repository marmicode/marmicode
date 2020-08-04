import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Recipe, RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-detail',
  template: `{{ recipe$ | async | json }}`,
  providers: [RxState],
})
export class RecipeDetailComponent {
  recipe$ = this._state.select('recipe');

  constructor(
    private _recipeRepository: RecipeRepository,
    private _state: RxState<{ recipe: Recipe }>
  ) {
    this._state.connect('recipe', this._recipeRepository.getRecipe());
  }
}

@NgModule({
  declarations: [RecipeDetailComponent],
  exports: [RecipeDetailComponent],
  imports: [CommonModule],
})
export class RecipeDetailModule {}
