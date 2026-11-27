import { Routes } from '@angular/router';
import {
  blogPostDetailRouterHelper,
  coachingRouterHelper,
  cohortRouterHelper,
  recipeDetailRouterHelper,
  resourceSearchRouterHelper,
  servicesRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
import { matchWip, or } from '@marmicode/shared/utils';
import { provideChatWidget } from './chat/chat';

export const routes: Routes = [
  /* Blog post detail. */
  {
    path: blogPostDetailRouterHelper.BLOG_POST_DETAIL_PATH,
    loadChildren: () =>
      import('@marmicode/blog-post/feature-detail').then(
        (m) => m.BlogPostFeatureDetailRoutingModule,
      ),
  },

  /* Recipe detail. */
  {
    matcher: or([
      recipeDetailRouterHelper.RECIPE_DETAIL_PATH,
      recipeDetailRouterHelper.TUTORIAL_DETAIL_PATH,
    ]),
    loadChildren: () =>
      import('@marmicode/recipe/feature-detail').then(
        (m) => m.RecipeDetailRoutingModule,
      ),
  },

  /* Resource search. */
  {
    path: resourceSearchRouterHelper.LEARN_PATH,
    loadChildren: () =>
      import('@marmicode/resource/feature-search').then(
        (m) => m.ResourceSearchRoutingModule,
      ),
  },

  /* Services */
  {
    path: servicesRouterHelper.SERVICES_PATH,
    loadChildren: () =>
      import('@marmicode/services/feature-presentation').then(
        (m) => m.ServicesRoutingModule,
      ),
  },

  /* Coaching. */
  {
    path: coachingRouterHelper.COACHING_PATH,
    providers: [provideChatWidget()],
    loadComponent: () => import('@marmicode/coaching/feature-presentation'),
  },

  /* Cohorts. */
  {
    path: cohortRouterHelper.COHORT_LIST_PATH,
    children: [
      /* There is a single cohort for now, so the list redirects to it. */
      {
        path: '',
        pathMatch: 'full',
        redirectTo: cohortRouterHelper.FROM_DRIFT_TO_TRUST_FOR_ANGULAR_ID,
      },
      /* From Drift to Trust for Angular. */
      {
        path: cohortRouterHelper.FROM_DRIFT_TO_TRUST_FOR_ANGULAR_ID,
        loadComponent: () => import('@marmicode/cohort/feature-presentation'),
      },
    ],
  },

  /* Workshops. */
  {
    path: workshopRouterHelper.WORKSHOP_LIST_PATH,
    providers: [provideChatWidget()],
    children: [
      /* Workshops list. */
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@marmicode/catalog/feature-list'),
      },
      /* Workshop detail. */
      {
        path: workshopRouterHelper.WORKSHOP_DETAIL_RELATIVE_PATH,
        loadComponent: () => import('@marmicode/workshop/feature-detail'),
      },
    ],
  },

  /* Home page (WIP). */
  {
    path: '',
    pathMatch: 'full',
    canMatch: [matchWip],
    loadComponent: () =>
      import('@marmicode/landing/feature-landing').then((m) => m.HomePage),
  },

  /* Landing page. */
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@marmicode/landing/feature-landing'),
  },

  /* Not found. */
  {
    path: '**',
    loadComponent: () => import('./not-found.ng'),
  },
];
