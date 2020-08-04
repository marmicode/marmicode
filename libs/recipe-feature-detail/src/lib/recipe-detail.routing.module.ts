import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { recipeDetailRouterHelper } from '@marmicode/shared-router-helpers';
import {
  RecipeDetailComponent,
  RecipeDetailModule,
} from './recipe-detail.component';

const routes: Routes = [
  {
    path: `:${recipeDetailRouterHelper.RECIPE_SLUG_PARAM}/:${recipeDetailRouterHelper.FRAME_SLUG_PARAM}`,
    component: RecipeDetailComponent,
  },
  {
    path: `:${recipeDetailRouterHelper.RECIPE_SLUG_PARAM}`,
    component: RecipeDetailComponent,
  },
];

@NgModule({
  imports: [CommonModule, RecipeDetailModule, RouterModule.forChild(routes)],
})
export class RecipeDetailRoutingModule {}
