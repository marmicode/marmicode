import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { servicesRouterHelper } from '@marmicode/services-feature-presentation';
import { ServicesRoutingModule } from './services/services-routing.module';

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
    path: servicesRouterHelper.SERVICES_PATH,
    loadChildren: () => ServicesRoutingModule,
  },

  /* / redirect. */
  {
    path: '',
    pathMatch: 'full',
    /* @todo use resourceSearchRouterHelper.learnEverything().join('/'). */
    redirectTo: '/learn',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
