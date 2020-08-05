import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { recipeDetailRouterHelper } from '@marmicode/shared-router-helpers';
import {
  RecipeFramePageComponent,
  RecipeFramePageModule,
} from './recipe-frame-page.component';

const routes: Routes = [
  {
    path: `:${recipeDetailRouterHelper.RECIPE_SLUG_PARAM}/:${recipeDetailRouterHelper.FRAME_SLUG_PARAM}`,
    component: RecipeFramePageComponent,
  },
  /* This will be a different page later. */
  {
    path: `:${recipeDetailRouterHelper.RECIPE_SLUG_PARAM}`,
    component: RecipeFramePageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RecipeFramePageModule, RouterModule.forChild(routes)],
})
export class RecipeDetailRoutingModule {}
