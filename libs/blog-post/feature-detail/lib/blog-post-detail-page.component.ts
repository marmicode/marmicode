import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostModule } from '@marmicode/blog-post/ui';
import { blogPostDetailRouterHelper } from '@marmicode/shared/router-helpers';
import {
  PageModule,
  SuspenseComponent,
  SuspenseModule,
} from '@marmicode/shared/ui';
import {
  shareReplayWithRefCount,
  TransferStateHelper,
} from '@marmicode/shared/utils';
import { PushPipe } from '@rx-angular/template/push';
import { filter, map, switchMap } from 'rxjs/operators';
import { BlogPostRepository } from './blog-post-repository.service';
import { blogPostToPageInfo } from './blog-post-to-page-info';
import { PageComponent } from '@marmicode/shared/ui';
import { BlogPostComponent } from '@marmicode/blog-post/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post-detail-page',
  template: ` <mc-page [info]="pageInfo$ | push">
    <mc-suspense [data$]="blogPost$">
      <ng-template #data let-blogPost>
        <mc-blog-post [blogPost]="blogPost"></mc-blog-post>
      </ng-template>
    </mc-suspense>
  </mc-page>`,
  imports: [PageComponent, SuspenseComponent, BlogPostComponent, PushPipe],
})
export class BlogPostDetailPageComponent {
  private _blogPostRepository = inject(BlogPostRepository);
  private _route = inject(ActivatedRoute);
  private _transferStateHelper = inject(TransferStateHelper);

  blogPost$ = this._route.paramMap.pipe(
    map((params) =>
      params.get(blogPostDetailRouterHelper.BLOG_POST_SLUG_PARAM),
    ),
    filter((blogPostSlug): blogPostSlug is string => blogPostSlug != null),
    switchMap((blogPostSlug) =>
      this._blogPostRepository
        .getBlogPost(blogPostSlug)
        .pipe(this._transferStateHelper.transfer(`blog-post-${blogPostSlug}`)),
    ),
    shareReplayWithRefCount(),
  );

  pageInfo$ = this.blogPost$.pipe(map(blogPostToPageInfo));
}

@NgModule({
  exports: [BlogPostDetailPageComponent],
  imports: [
    CommonModule,
    PageModule,
    BlogPostModule,
    SuspenseModule,
    PushPipe,
    BlogPostDetailPageComponent,
  ],
})
export class BlogPostDetailPageModule {}
