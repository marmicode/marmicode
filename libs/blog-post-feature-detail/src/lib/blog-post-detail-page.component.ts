import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostModule } from '@marmicode/blog-post-ui';
import { blogPostDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { PageModule, SuspenseModule } from '@marmicode/shared-ui';
import { shareReplayWithRefCount } from '@marmicode/shared-utils';
import { map, switchMap } from 'rxjs/operators';
import { BlogPostRepository } from './blog-post-repository.service';
import { blogPostToPageInfo } from './blog-post-to-page-info';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post-detail-page',
  template: ` <mc-page [info]="pageInfo$ | async">
    <mc-suspense [data$]="blogPost$">
      <ng-template #data let-blogPost>
        <mc-blog-post [blogPost]="blogPost"></mc-blog-post>
      </ng-template>
    </mc-suspense>
  </mc-page>`,
})
export class BlogPostDetailPageComponent {
  blogPost$ = this._route.paramMap.pipe(
    map((params) =>
      params.get(blogPostDetailRouterHelper.BLOG_POST_SLUG_PARAM)
    ),
    switchMap((blogPostSlug) =>
      this._blogPostRepository.getBlogPost(blogPostSlug)
    ),
    shareReplayWithRefCount()
  );

  pageInfo$ = this.blogPost$.pipe(map(blogPostToPageInfo));

  constructor(
    private _route: ActivatedRoute,
    private _blogPostRepository: BlogPostRepository
  ) {}
}

@NgModule({
  declarations: [BlogPostDetailPageComponent],
  exports: [BlogPostDetailPageComponent],
  imports: [CommonModule, PageModule, BlogPostModule, SuspenseModule],
})
export class BlogPostDetailPageModule {}
