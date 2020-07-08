import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningMapRoutingModule } from './learning-map-routing.module';

export const routes: Routes = [
  {
    path: 'learning-map',
    loadChildren: () => LearningMapRoutingModule,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'learning-map',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
