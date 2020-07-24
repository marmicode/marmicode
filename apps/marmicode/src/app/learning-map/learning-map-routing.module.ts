import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LearningMapComponent,
  LearningMapModule,
} from '@marmicode/learning-map-feature-tree';

export const routes: Routes = [
  {
    path: '',
    component: LearningMapComponent,
  },
];

@NgModule({
  imports: [LearningMapModule, RouterModule.forChild(routes)],
})
export class LearningMapRoutingModule {}
