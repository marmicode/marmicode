import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BlockGroupComponent,
  getMarkdownHeadingId,
  getMarkdownHeadingText,
  getMarkdownTokenType,
  MarkdownTokens,
  MarkdownTokenType,
  parseMarkdown,
} from '@marmicode/block/api';
import { Link } from '@marmicode/shared/ui';
import { BlogPost } from './blog-post';
import { markdownToFrameBlockGroups } from './markdown-to-frame-block-groups';
import { FollowButtonComponent } from './social/follow-button.component';
import { ShareButtonsComponent } from './social/share-buttons.component';

/**
 * Dark article: header (back link, kicker, title, summary, byline, cover), reading column with `mc-block-group`,
 * sticky "On this page" from the `##` headings, share buttons and author card.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-blog-post-article',
  imports: [
    BlockGroupComponent,
    FollowButtonComponent,
    NgTemplateOutlet,
    RouterLink,
    ShareButtonsComponent,
  ],
  template: `
    @let blogPost = this.blogPost();

    <div
      class="progress"
      aria-hidden="true"
      [style.transform]="'scaleX(' + progress() + ')'"
    ></div>

    <header class="narrow">
      @if (backHref(); as href) {
        <a class="back" [href]="href" rel="noopener" target="_blank">
          <ng-container *ngTemplateOutlet="backContent" />
        </a>
      } @else {
        <a class="back" [routerLink]="backRoute()">
          <ng-container *ngTemplateOutlet="backContent" />
        </a>
      }
      <ng-template #backContent>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        Library
      </ng-template>

      <span class="type">Article</span>
      <h1>{{ blogPost.title }}</h1>
      <p class="lead">{{ blogPost.summary }}</p>

      <div class="byline">
        <div class="author">
          @if (blogPost.author.pictureUri; as pictureUri) {
            <img alt="" [src]="pictureUri" />
          }
          <div>
            <b>{{ blogPost.author.name }}</b>
            <span class="meta">
              @if (releasedAt(); as releasedAt) {
                <span>{{ releasedAt }}</span>
                <span aria-hidden="true">·</span>
              }
              <span>{{ blogPost.duration }} min read</span>
            </span>
          </div>
        </div>
        <mc-share-buttons
          class="share"
          size="small"
          [author]="blogPost.author"
          [title]="blogPost.title"
        />
      </div>
    </header>

    <div class="cover">
      @if (blogPost.pictureUri; as pictureUri) {
        <img [alt]="blogPost.title" [src]="pictureUri" />
      } @else {
        <!-- Decorative gradient, as on library rows without a picture. -->
        <div class="placeholder" aria-hidden="true"></div>
      }
    </div>

    <div class="layout">
      @if (tableOfContents().length > 0) {
        <nav class="toc" aria-label="On this page">
          <span class="mc-eyebrow">// on this page</span>
          <ol>
            @for (item of tableOfContents(); track item.id) {
              <li>
                <a
                  [class.active]="item.id === activeHeadingId()"
                  [attr.aria-current]="
                    item.id === activeHeadingId() ? 'location' : null
                  "
                  [fragment]="item.id"
                  [routerLink]="[]"
                >
                  {{ item.title }}
                </a>
              </li>
            }
          </ol>
        </nav>
      }

      <article #article class="prose">
        @for (blockGroup of blockGroups(); track $index) {
          <mc-block-group [blockGroup]="blockGroup" desktopLayout="column" />
        }

        <div class="article-end">
          <div class="end-row">
            <span>Enjoyed it? Pass it on.</span>
            <mc-share-buttons
              class="share"
              size="small"
              [author]="blogPost.author"
              [title]="blogPost.title"
            />
          </div>
          <div class="author-card">
            @if (blogPost.author.pictureUri; as pictureUri) {
              <img alt="" [src]="pictureUri" />
            }
            <div>
              <h2>{{ blogPost.author.name }}</h2>
              <mc-follow-button [author]="blogPost.author" />
            </div>
          </div>
        </div>
      </article>
    </div>
  `,
  styles: `
    :host {
      position: relative;
      z-index: 1;
      display: block;
      color: var(--mc-dark-text);
    }

    /* Reading progress: a thin gradient line at the very top. */
    .progress {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 25;
      width: 100%;
      height: 3px;
      background: var(--mc-gradient);
      transform: scaleX(0);
      transform-origin: left;
    }

    .narrow {
      display: block;
      width: min(760px, 100% - 32px);
      margin-inline: auto;
      padding: 48px 0 32px;
    }

    .back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 26px;
      color: var(--mc-dark-muted);
      font-size: 14px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: var(--mc-dark-text);
      }

      svg {
        width: 16px;
        height: 16px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }

    .type {
      display: block;
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
      font-size: 11.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    h1 {
      margin: 16px 0 18px;
      font-size: clamp(34px, 5.2vw, 56px);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1.04;
    }

    .lead {
      margin: 0 0 28px;
      color: var(--mc-dark-muted);
      font-size: clamp(17px, 2vw, 20px);
      line-height: 1.55;
    }

    .byline {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-top: 20px;
      border-top: 1px solid var(--mc-dark-line);
    }

    .author {
      display: flex;
      align-items: center;
      gap: 12px;

      img {
        width: 44px;
        height: 44px;
        border: 1px solid var(--mc-dark-line-strong);
        border-radius: 50%;
        object-fit: cover;
        object-position: 30% 20%;
      }

      b {
        display: block;
        font-size: 15px;
        font-weight: 600;
      }
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2px 10px;
      color: var(--mc-dark-muted);
      font-size: 12.5px;
    }

    .cover {
      position: relative;
      width: min(1000px, 100% - 32px);
      margin: 8px auto 0;

      img,
      .placeholder {
        display: block;
        width: 100%;
        aspect-ratio: 21 / 8;
        border: 1px solid var(--mc-dark-line);
        border-radius: 22px;
        object-fit: cover;
      }

      .placeholder {
        position: relative;
        overflow: hidden;
        background:
          radial-gradient(
            70% 90% at 15% 15%,
            rgba(var(--mc-violet-rgb), 0.55),
            transparent 65%
          ),
          radial-gradient(
            60% 80% at 90% 95%,
            rgba(var(--mc-accent-rgb), 0.32),
            transparent 65%
          ),
          #1e1426;

        /* Dotted grid fading out, as on the library rows. */
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.07) 1px,
            transparent 1px
          );
          background-size: 14px 14px;
          mask-image: linear-gradient(to bottom, #000, transparent 85%);
        }
      }
    }

    @media (max-width: 600px) {
      .cover img,
      .cover .placeholder {
        aspect-ratio: 16 / 9;
      }
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 720px) minmax(0, 1fr);
      gap: 40px;
      width: min(1180px, 100% - 32px);
      margin: 56px auto 0;
    }

    .layout > article {
      grid-row: 1;
      grid-column: 2;
      min-width: 0;
    }

    .toc {
      position: sticky;
      top: 96px;
      grid-column: 3;
      align-self: start;
      font-size: 14px;

      .mc-eyebrow {
        display: block;
        margin-bottom: 12px;
      }

      ol {
        display: grid;
        gap: 10px;
        margin: 0;
        padding: 0 0 0 14px;
        border-left: 1px solid var(--mc-dark-line-strong);
        list-style: none;
      }

      a {
        display: block;
        color: var(--mc-dark-muted);
        text-decoration: none;
        transition: color 0.2s;

        &:hover,
        &.active {
          color: var(--mc-dark-text);
        }

        &.active {
          box-shadow: -15px 0 0 -13px var(--mc-accent);
        }
      }
    }

    @media (max-width: 1100px) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
      }

      .layout > article {
        grid-column: 1;
      }

      .toc {
        display: none;
      }
    }

    .article-end {
      display: grid;
      gap: 22px;
      margin-top: 56px;
      padding-top: 28px;
      border-top: 1px solid var(--mc-dark-line);
    }

    .end-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      color: var(--mc-dark-muted);
      font-size: 15px;
    }

    .author-card {
      display: grid;
      grid-template-columns: 72px 1fr;
      align-items: center;
      gap: 18px;
      padding: 22px;
      border: 1px solid var(--mc-dark-line);
      border-radius: 20px;
      background: var(--mc-dark-surface);

      img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        object-fit: cover;
        object-position: 30% 20%;
      }

      h2 {
        margin: 0 0 10px;
        font-size: 18px;
        font-weight: 600;
      }
    }

    @media (max-width: 520px) {
      .author-card {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class BlogPostArticle {
  blogPost = input.required<BlogPost>();
  /** Library link, built by the page: `blog-post/ui` can't import `shared/router-helpers`. */
  backLink = input.required<Link>();

  protected readonly backHref = computed(() => {
    const link = this.backLink();
    return 'href' in link ? link.href : undefined;
  });
  protected readonly backRoute = computed(() => {
    const link = this.backLink();
    return 'route' in link ? link.route : undefined;
  });

  protected readonly blockGroups = computed(() =>
    markdownToFrameBlockGroups(this.blogPost().text),
  );

  /** "Nov 18, 2024" (dates become strings when they go through transfer state). */
  protected readonly releasedAt = computed(() => {
    const releasedAt = this.blogPost().releasedAt;
    return releasedAt != null
      ? DATE_FORMAT.format(new Date(releasedAt))
      : undefined;
  });

  protected readonly tableOfContents = computed(() =>
    getTableOfContents(this.blogPost().text),
  );

  /** The last heading scrolled past, the first one until then. */
  protected readonly activeHeadingId = signal<string | undefined>(undefined);
  /** How much of the article was read, from 0 to 1. */
  protected readonly progress = signal(0);

  private readonly _article =
    viewChild.required<ElementRef<HTMLElement>>('article');

  constructor() {
    const destroyRef = inject(DestroyRef);
    const document = inject(DOCUMENT);

    /* Browser only: headings render asynchronously, so look them up on each scroll
     * instead of observing elements that may not exist yet. */
    afterNextRender(() => {
      const window = document.defaultView;
      if (window == null) {
        return;
      }

      const onScroll = () => {
        const rect = this._article().nativeElement.getBoundingClientRect();
        const total = rect.height - window.innerHeight * 0.6;
        this.progress.set(
          total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0,
        );

        const headingIds = this.tableOfContents().map(({ id }) => id);
        const passedIds = headingIds.filter(
          (id) =>
            (document.getElementById(id)?.getBoundingClientRect().top ??
              Infinity) < 140,
        );
        this.activeHeadingId.set(passedIds.at(-1) ?? headingIds[0]);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() =>
        window.removeEventListener('scroll', onScroll),
      );
      onScroll();
    });
  }
}

/**
 * `## Heading` lines of the markdown, with slug ids matching the rendered headings.
 */
export function getTableOfContents(
  text: string,
): Array<{ id: string; title: string }> {
  return parseMarkdown(text)
    .filter(
      (token): token is MarkdownTokens.Heading =>
        getMarkdownTokenType(token) === MarkdownTokenType.Heading &&
        (token as MarkdownTokens.Heading).depth === 2,
    )
    .map((token) => ({
      id: getMarkdownHeadingId(token),
      title: getMarkdownHeadingText(token),
    }));
}

const DATE_FORMAT = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});
