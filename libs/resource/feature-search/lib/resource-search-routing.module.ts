import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryPage } from './library-page.ng';
import { ResourceRepositoryModule } from './resource-repository.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LibraryPage,
  },
];

@NgModule({
  imports: [ResourceRepositoryModule, RouterModule.forChild(routes)],
})
export class ResourceSearchRoutingModule {}
