import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resourceSearchRouterHelper } from '@marmicode/shared/router-helpers';
import { LibraryPage } from './library-page.ng';
import { ResourceRepositoryModule } from './resource-repository.service';

export const routes: Routes = [
  {
    path: `:${resourceSearchRouterHelper.SKILL_SLUG_PARAM}`,
    component: LibraryPage,
  },
];

@NgModule({
  imports: [ResourceRepositoryModule, RouterModule.forChild(routes)],
})
export class ResourceSearchRoutingModule {}
