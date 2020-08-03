import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resourceSearchRouterHelper } from '@marmicode/shared-router-helpers';
import { ResourceSearchComponent } from './resource-search.component';
import { ResourceSearchModule } from './resource-search.component';

export const routes: Routes = [
  {
    path: `:${resourceSearchRouterHelper.SKILL_SLUG_PARAM}`,
    component: ResourceSearchComponent,
  },
];

@NgModule({
  imports: [ResourceSearchModule, RouterModule.forChild(routes)],
})
export class ResourceSearchRoutingModule {}
