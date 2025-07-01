import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resourceSearchRouterHelper } from '@marmicode/shared/router-helpers';
import { ResourceSearchPageComponent } from './resource-search-page.component';
import { ResourceSearchModule } from './resource-search-page.component';

export const routes: Routes = [
  {
    path: `:${resourceSearchRouterHelper.SKILL_SLUG_PARAM}`,
    component: ResourceSearchPageComponent,
  },
];

@NgModule({
  imports: [ResourceSearchModule, RouterModule.forChild(routes)],
})
export class ResourceSearchRoutingModule {}
