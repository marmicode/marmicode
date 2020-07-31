import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resourceSearchRouterHelper } from './resource-search-router-helper';
import { ResourceSearchComponent } from './resource-search.component';
import { ResourceSearchModule } from './resource-search.component';

export const routes: Routes = [
  {
    path: `:${resourceSearchRouterHelper.SKILL_SLUG_PARAM}`,
    component: ResourceSearchComponent,
  },
  {
    path: '',
    redirectTo: resourceSearchRouterHelper.learnEverything().join('/'),
  },
];

@NgModule({
  imports: [ResourceSearchModule, RouterModule.forChild(routes)],
})
export class ResourceSearchRoutingModule {}
