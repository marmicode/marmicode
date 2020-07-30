import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resourceSearchRouterHelper } from '@marmicode/resource-feature-search';
import {
  ServicesModule,
  servicesRouterHelper,
} from '@marmicode/services-feature-presentation';
import { ResourceSearchRoutingModule } from './resource-search/resource-search-routing.module';
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
    path: resourceSearchRouterHelper.LEARN_PATH,
    loadChildren: () => ResourceSearchRoutingModule,
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
    redirectTo: resourceSearchRouterHelper.learnEverything().join('/'),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
