import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningMapRoutingModule } from './learning-map/learning-map-routing.module';

export const routes: Routes = [
  {
    path: 'learning-map',
    loadChildren: () => LearningMapRoutingModule,
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./resource-search/resource-search-routing.module').then(
        (m) => m.ResourceSearchRoutingModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
