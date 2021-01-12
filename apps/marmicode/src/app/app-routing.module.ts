import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  blogPostDetailRouterHelper,
  recipeDetailRouterHelper,
  resourceSearchRouterHelper,
  servicesRouterHelper,
} from '@marmicode/shared-router-helpers';
import { or } from '@marmicode/shared-utils';

export const routes: Routes = [
  /* Blog post detail. */
  {
    path: blogPostDetailRouterHelper.BLOG_POST_DETAIL_PATH,
    loadChildren: () =>
      import('@marmicode/blog-post-feature-detail').then(
        (m) => m.BlogPostFeatureDetailRoutingModule
      ),
  },

  /* Recipe detail. */
  {
    matcher: or([
      recipeDetailRouterHelper.RECIPE_DETAIL_PATH,
      recipeDetailRouterHelper.TUTORIAL_DETAIL_PATH,
    ]),
    loadChildren: () =>
      import('@marmicode/recipe-feature-detail').then(
        (m) => m.RecipeDetailRoutingModule
      ),
  },

  /* Resource search. */
  {
    path: resourceSearchRouterHelper.LEARN_PATH,
    loadChildren: () =>
      import('@marmicode/resource-feature-search').then(
        (m) => m.ResourceSearchRoutingModule
      ),
  },

  /* Services */
  {
    path: servicesRouterHelper.SERVICES_PATH,
    loadChildren: () =>
      import('@marmicode/services-feature-presentation').then(
        (m) => m.ServicesRoutingModule
      ),
  },

  /* / redirect. */
  {
    path: '',
    pathMatch: 'full',
    /* @todo use resourceSearchRouterHelper.learnEverything().join('/'). */
    redirectTo: '/learn/everything',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
