import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { recipeDetailRouterHelper } from '@marmicode/shared/router-helpers';
import {
  RecipeDetailPageComponent,
  RecipeDetailModule,
} from './recipe-detail-page.component';
import {
  RecipeFramePageComponent,
  RecipeFramePageModule,
} from './recipe-frame-page.component';

const routes: Routes = [
  {
    path: `:${recipeDetailRouterHelper.RECIPE_SLUG_PARAM}/:${recipeDetailRouterHelper.FRAME_SLUG_PARAM}`,
    component: RecipeFramePageComponent,
  },
  {
    path: `:${recipeDetailRouterHelper.RECIPE_SLUG_PARAM}`,
    component: RecipeDetailPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RecipeDetailModule,
    RecipeFramePageModule,
    RouterModule.forChild(routes),
  ],
})
export class RecipeDetailRoutingModule {}
