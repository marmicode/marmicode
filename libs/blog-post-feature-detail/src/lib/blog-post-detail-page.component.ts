import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostModule } from '@marmicode/blog-post-ui';
import { blogPostDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { PageModule } from '@marmicode/shared-ui';
import { map, switchMap } from 'rxjs/operators';
import { BlogPostRepository } from './blog-post-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post-detail-page',
  template: ` <mc-page>
    <mc-blog-post
      *ngIf="blogPost$ | async as blogPost"
      [blogPost]="blogPost"
    ></mc-blog-post>
  </mc-page>`,
})
export class BlogPostDetailPageComponent {
  blogPost$ = this._route.paramMap.pipe(
    map((params) =>
      params.get(blogPostDetailRouterHelper.BLOG_POST_SLUG_PARAM)
    ),
    switchMap((blogPostSlug) =>
      this._blogPostRepository.getBlogPost(blogPostSlug)
    )
  );

  constructor(
    private _route: ActivatedRoute,
    private _blogPostRepository: BlogPostRepository
  ) {}
}

@NgModule({
  declarations: [BlogPostDetailPageComponent],
  exports: [BlogPostDetailPageComponent],
  imports: [CommonModule, PageModule, BlogPostModule],
})
export class BlogPostDetailPageModule {}
