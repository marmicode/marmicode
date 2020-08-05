import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { recipeDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { PageModule } from '@marmicode/shared-ui';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { defer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  RecipeRepository,
  RecipeRepositoryModule,
} from './recipe-repository.service';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-detail',
  template: `<mc-page></mc-page>`,
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private _recipeRepository: RecipeRepository,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.paramMap
      .pipe(
        map((params) => params.get(recipeDetailRouterHelper.RECIPE_SLUG_PARAM)),
        switchMap((recipeSlug) =>
          this._recipeRepository.getRecipeFirstFrameSlug(recipeSlug)
        ),
        // @todo redirect
        untilDestroyed(this)
      )
      .subscribe();
  }
}

@NgModule({
  declarations: [RecipeDetailComponent],
  exports: [RecipeDetailComponent],
  imports: [CommonModule, PageModule, RecipeRepositoryModule],
})
export class RecipeDetailModule {}
