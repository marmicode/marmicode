import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { RecipeFrameModule } from './recipe-frame.component';
import { Recipe, RecipeRepository } from './recipe-repository.service';
import { RecipeTimelineModule } from './recipe-timeline.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-detail',
  template: `<mc-recipe-frame
      [frame]="selectedFrame$ | async"
    ></mc-recipe-frame>
    <mc-recipe-timeline class="timeline"></mc-recipe-timeline> `,
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
  imports: [CommonModule, RecipeFrameModule, RecipeTimelineModule],
})
export class RecipeDetailModule {}
