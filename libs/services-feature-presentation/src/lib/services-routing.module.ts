import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent, ServicesModule } from './services.component';

export const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
  },
];

@NgModule({
  imports: [ServicesModule, RouterModule.forChild(routes)],
})
export class ServicesRoutingModule {}