import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resourceSearchRouterHelper } from '@marmicode/resource-feature-search';
import { ResourceSearchRoutingModule } from './resource-search/resource-search-routing.module';

export const routes: Routes = [
  {
    path: 'learning-map',
    loadChildren: () =>
      import('./learning-map/learning-map-routing.module').then(
        (m) => m.LearningMapRoutingModule
      ),
  },
  {
    path: resourceSearchRouterHelper.LEARN_PATH,
    loadChildren: () => ResourceSearchRoutingModule,
  },
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
