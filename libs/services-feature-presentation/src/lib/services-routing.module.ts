import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ServicesPageComponent,
  ServicesModule,
} from './services-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ServicesPageComponent,
  },
];

@NgModule({
  imports: [ServicesModule, RouterModule.forChild(routes)],
})
export class ServicesRoutingModule {}
