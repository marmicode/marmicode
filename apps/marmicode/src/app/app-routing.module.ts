import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  /* Learning map. */
  {
    path: 'learning-map',
    loadChildren: () =>
      import('./learning-map/learning-map-routing.module').then(
        (m) => m.LearningMapRoutingModule
      ),
  },

  /* Resource search. */
  {
    /* @todo use resourceSearchRouterHelper. */
    path: 'learn',
    loadChildren: () =>
      import('@marmicode/resource-feature-search').then(
        (m) => m.ResourceSearchRoutingModule
      ),
  },

  /* Services */
  {
    /* @todo use servicesRouterHelper. */
    path: 'services',
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
