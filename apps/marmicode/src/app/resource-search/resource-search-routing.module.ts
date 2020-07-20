import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ResourceSearchComponent,
  ResourceSearchModule,
} from './resource-search.component';

export const routes: Routes = [
  {
    path: '',
    component: ResourceSearchComponent,
  },
];

@NgModule({
  imports: [ResourceSearchModule, RouterModule.forChild(routes)],
})
export class ResourceSearchRoutingModule {}
