import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { RecipeFrameModule } from './recipe-frame.component';
import { Recipe, RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-detail',
  template: `<mc-recipe-frame
    [frame]="selectedFrame$ | async"
  ></mc-recipe-frame>`,
  providers: [RxState],
})
export class RecipeDetailComponent {
  recipe$ = this._state.select('recipe');
  selectedFrame$ = this.recipe$.pipe(map((recipe) => recipe.frames[0]));

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
  imports: [CommonModule, RecipeFrameModule],
})
export class RecipeDetailModule {}
