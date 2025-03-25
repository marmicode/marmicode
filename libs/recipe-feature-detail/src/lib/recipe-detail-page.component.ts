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
import { map, switchMap } from 'rxjs/operators';
import {
  RecipeRepository,
  RecipeRepositoryModule,
} from './recipe-repository.service';
import { PageComponent } from '@marmicode/shared-ui';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-detail-page',
  template: `<mc-page></mc-page>`,
  imports: [PageComponent],
})
export class RecipeDetailPageComponent implements OnInit {
  constructor(
    private _recipeRepository: RecipeRepository,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit() {
    /* Redirect to first frame meanwhile we implement the recipe presentation page. */
    this._route.paramMap
      .pipe(
        map((params) => params.get(recipeDetailRouterHelper.RECIPE_SLUG_PARAM)),
        switchMap((recipeSlug) =>
          this._recipeRepository.getRecipeFirstFrameSlug(recipeSlug),
        ),
        switchMap((frameSlug) =>
          this._router.navigate([frameSlug], {
            relativeTo: this._route,
            /* Act like a redirect to avoid getting stuck when hitting back. */
            replaceUrl: true,
          }),
        ),
        untilDestroyed(this),
      )
      .subscribe();
  }
}

@NgModule({
  exports: [RecipeDetailPageComponent],
  imports: [
    CommonModule,
    PageModule,
    RecipeRepositoryModule,
    RecipeDetailPageComponent,
  ],
})
export class RecipeDetailModule {}
