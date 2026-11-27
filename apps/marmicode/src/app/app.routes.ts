import { Routes } from '@angular/router';
import {
  blogPostDetailRouterHelper,
  coachingRouterHelper,
  cohortRouterHelper,
  resourceSearchRouterHelper,
  workshopRouterHelper,
} from '@marmicode/shared/router-helpers';
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

  /* Recipes and tutorials are gone: send them to the library. */
  {
    path: 'recipe',
    children: [
      {
        path: '**',
        redirectTo: resourceSearchRouterHelper.learnEverythingUrl(),
      },
    ],
  },
  {
    path: 'tutorial',
    children: [
      {
        path: '**',
        redirectTo: resourceSearchRouterHelper.learnEverythingUrl(),
      },
    ],
  },

  /* Resource search. */
  {
    path: resourceSearchRouterHelper.LEARN_PATH,
    loadChildren: () =>
      import('@marmicode/resource/feature-search').then(
        (m) => m.ResourceSearchRoutingModule,
      ),
  },

  /* Services became coaching. */
  {
    path: 'services',
    pathMatch: 'full',
    redirectTo: coachingRouterHelper.coachingUrl(),
  },

  /* Coaching. */
  {
    path: coachingRouterHelper.COACHING_PATH,
    providers: [provideChatWidget()],
    children: [
      /* Coaching page. */
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@marmicode/coaching/feature-presentation'),
      },
    ],
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
      /* Training list. */
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@marmicode/catalog/feature-list'),
      },
      /* Workshop page. */
      {
        path: workshopRouterHelper.WORKSHOP_DETAIL_RELATIVE_PATH,
        loadComponent: () => import('@marmicode/workshop/feature-detail'),
      },
    ],
  },

  /* Home page. */
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@marmicode/landing/feature-landing'),
  },

  /* Not found. */
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page.ng').then((m) => m.NotFoundPage),
  },
];
