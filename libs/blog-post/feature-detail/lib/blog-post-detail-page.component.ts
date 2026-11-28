import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { ActivatedRoute } from '@angular/router';
import { BlogPostArticle } from '@marmicode/blog-post/ui';
import { ResourceRow } from '@marmicode/resource/ui';
import {
  blogPostDetailRouterHelper,
  resourceSearchRouterHelper,
} from '@marmicode/shared/router-helpers';
import {
  Link,
  NewsletterBand,
  PageComponent,
  SuspenseComponent,
} from '@marmicode/shared/ui';
import {
  shareReplayWithRefCount,
  TransferStateHelper,
} from '@marmicode/shared/utils';
import { PushPipe } from '@rx-angular/template/push';
import { map, switchMap } from 'rxjs/operators';
import { BlogPostRepository } from './blog-post-repository.service';
import { blogPostToPageInfo } from './blog-post-to-page-info';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post-detail-page',
  template: `
    <mc-page [info]="pageInfo$ | push">
      <mc-suspense [data$]="blogPost$">
        <ng-template #data let-blogPost>
          <mc-blog-post-article
            [backLink]="libraryLink"
            [blogPost]="blogPost"
            (linkCopied)="trackLinkCopy()"
          />
        </ng-template>
      </mc-suspense>

      <div class="wrap end">
        <mc-suspense [data$]="latestResources$">
          <ng-template #data let-resources>
            @if (resources.length > 0) {
              <section class="more" aria-labelledby="keep-cooking">
                <span class="mc-eyebrow">// keep cooking</span>
                <h2 id="keep-cooking">More from the library</h2>
                <div class="rows">
                  @for (resource of resources; track resource.title) {
                    <mc-resource-row [resource]="resource" />
                  }
                </div>
              </section>
            }
          </ng-template>
          <!-- "Keep cooking" is a bonus: nothing while it loads or if it fails. -->
          <ng-template #suspense />
          <ng-template #error />
        </mc-suspense>

        <mc-newsletter-band
          class="newsletter"
          description="New articles, videos and workshop dates. No spam, just the sauce."
          heading="Fresh recipes in your inbox."
          source="blog"
        />
      </div>
    </mc-page>
  `,
  styles: `
    .wrap {
      display: block;
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
    }

    .end {
      position: relative;
      z-index: 1;
      padding-bottom: 120px;
    }

    .more {
      margin-top: 88px;

      h2 {
        margin: 10px 0 24px;
        font-size: clamp(28px, 3.6vw, 40px);
        font-weight: 700;
        letter-spacing: -0.035em;
        line-height: 1.1;
      }
    }

    .rows {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .newsletter {
      margin-top: 72px;
    }
  `,
  imports: [
    BlogPostArticle,
    NewsletterBand,
    PageComponent,
    PushPipe,
    ResourceRow,
    SuspenseComponent,
  ],
})
export class BlogPostDetailPageComponent {
  /* Optional: not provided in tests. */
  private _analytics = inject(Analytics, { optional: true });
  private _blogPostRepository = inject(BlogPostRepository);
  private _route = inject(ActivatedRoute);
  private _transferStateHelper = inject(TransferStateHelper);

  protected readonly libraryLink: Link = {
    route: resourceSearchRouterHelper.library(),
  };

  private _blogPostSlug$ = this._route.paramMap.pipe(
    map(
      (params) => params.get(blogPostDetailRouterHelper.BLOG_POST_SLUG_PARAM)!,
    ),
  );

  blogPost$ = this._blogPostSlug$.pipe(
    switchMap((blogPostSlug) =>
      this._blogPostRepository
        .getBlogPost(blogPostSlug)
        .pipe(this._transferStateHelper.transfer(`blog-post-${blogPostSlug}`)),
    ),
    shareReplayWithRefCount(),
  );

  /** The 3 newest other resources. */
  latestResources$ = this._blogPostSlug$.pipe(
    switchMap((blogPostSlug) =>
      this._blogPostRepository
        .getLatestResources({ excludeSlug: blogPostSlug, limit: 3 })
        .pipe(
          this._transferStateHelper.transfer(
            `blog-post-latest-resources-${blogPostSlug}`,
          ),
        ),
    ),
  );

  pageInfo$ = this.blogPost$.pipe(map(blogPostToPageInfo));

  /** GA4's recommended `share` event, so we can tell whether anyone copies links. */
  protected trackLinkCopy() {
    if (this._analytics == null) {
      return;
    }
    logEvent(this._analytics, 'share', {
      method: 'copy_link',
      content_type: 'article',
      item_id: this._route.snapshot.paramMap.get(
        blogPostDetailRouterHelper.BLOG_POST_SLUG_PARAM,
      )!,
    });
  }
}
