import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { blogPostDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { BlogPostDetailPageComponent } from './blog-post-detail-page.component';

export const routes: Routes = [
  /* /blog/:blogPostSlug */
  {
    path: `:${blogPostDetailRouterHelper.BLOG_POST_SLUG_PARAM}`,
    component: BlogPostDetailPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BlogPostFeatureDetailRoutingModule {}
