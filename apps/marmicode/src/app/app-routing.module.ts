import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: '',
    loadChildren: () => ResourceSearchRoutingModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
