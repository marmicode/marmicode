import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { PlatformInfo } from '@marmicode/shared/infra';
import { HtmlAdapter } from './html-adapter';

export interface BasicPageInfo {
  description?: string;
  alternates?: Array<{ path: string; language: string }>;
  /**
   * The path of the page.
   * Used to set the canonical link tag.
   */
  path?: string;
  language?: string;
  pictureUri?: string;
  title?: string;
}

export function createBasicPageInfo(pageInfo: BasicPageInfo) {
  return pageInfo;
}

export interface ArticlePageInfo extends BasicPageInfo {
  type: 'article';
  author?: {
    name: string;
    twitter?: string;
  };
  publishedAt?: Date;
}

export function createArticlePageInfo(
  meta: Omit<ArticlePageInfo, 'type'>,
): ArticlePageInfo {
  return {
    ...meta,
    type: 'article',
  };
}

export type PageInfo = BasicPageInfo | ArticlePageInfo;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-page',
  template: `
    <div class="glow" aria-hidden="true"></div>
    <ng-content />
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      isolation: isolate;
      min-height: 100%;
      background-color: var(--mc-dark-bg);
      color: var(--mc-dark-text);
      font-family: var(--mc-font-sans);
      line-height: 1.55;
      -webkit-font-smoothing: antialiased;
    }

    .glow {
      position: absolute;
      inset: 0 0 auto 0;
      height: 900px;
      overflow: hidden;
      pointer-events: none;
      z-index: -1;
    }

    .glow::before,
    .glow::after {
      content: '';
      position: absolute;
      left: 50%;
      border-radius: 50%;
      filter: blur(90px);
    }

    .glow::before {
      width: 620px;
      height: 620px;
      top: -260px;
      transform: translateX(-80%);
      background: rgba(var(--mc-violet-rgb), 0.38);
    }

    .glow::after {
      width: 520px;
      height: 520px;
      top: -160px;
      transform: translateX(10%);
      background: rgba(var(--mc-accent-rgb), 0.26);
    }
  `,
})
export class PageComponent {
  info = input<PageInfo>();

  private _htmlAdapter = inject(HtmlAdapter);
  private _metaService = inject(Meta);
  private _titleService = inject(Title);
  private _defaultLanguage = 'en';
  private _defaultTitle = 'Marmicode';
  private _platformInfo = inject(PlatformInfo);

  constructor() {
    effect((onCleanup) => {
      const info = this.info();
      if (info == null) {
        return;
      }

      /* Sync input with page title. */
      this._titleService.setTitle(this._infoToTitle(info));
      onCleanup(() => this._titleService.setTitle(this._defaultTitle));

      /* Sync html[lang] with page info language. */
      if (info.language) {
        this._htmlAdapter.setHtmlAttribute('lang', info.language);
        onCleanup(() =>
          this._htmlAdapter.setHtmlAttribute('lang', this._defaultLanguage),
        );
      }

      const tags: Array<{ remove: () => void }> = [];

      if (info.path) {
        tags.push(
          this._htmlAdapter.upsertLinkTag({
            rel: 'canonical',
            href: this._pathToUrl(info.path),
          }),
        );
      }

      if (info.alternates) {
        tags.push(
          ...info.alternates.map((alternate) =>
            this._htmlAdapter.upsertLinkTag({
              rel: 'alternate',
              hreflang: alternate.language,
              href: this._pathToUrl(alternate.path),
            }),
          ),
        );

        const englishAlternate = info.alternates.find(
          (alternate) => alternate.language === this._defaultLanguage,
        );
        if (englishAlternate) {
          const href = this._pathToUrl(englishAlternate.path);
          tags.push(
            this._htmlAdapter.upsertLinkTag({
              rel: 'alternate',
              href,
              hreflang: 'x-default',
            }),
          );
        }
      }

      /* Update meta data. */
      const metas = this._infoToMetaTags(info);
      const tagEls = this._metaService.addTags(metas);
      onCleanup(() => {
        tags.forEach((tag) => tag.remove());
        tagEls.forEach((el) => this._metaService.removeTagElement(el));
      });
    });
  }

  private _infoToTitle(info: PageInfo) {
    return info.title ? `${info.title} | Marmicode` : this._defaultTitle;
  }

  private _infoToMetaTags(info: PageInfo): MetaDefinition[] {
    const baseTags: Array<{
      name?: string;
      property?: string;
      content?: string | null;
    }> = [
      { name: 'description', content: info.description },
      { property: 'og:description', content: info.description },
      { property: 'og:image', content: info.pictureUri },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: info.description },
      { property: 'twitter:title', content: this._infoToTitle(info) },
    ];
    if ('type' in info && info.type === 'article') {
      const twitter = info.author?.twitter;
      baseTags.push(
        { name: 'author', content: info.author?.name },
        { property: 'og:type', content: info.type },
        {
          property: 'article:published_time',
          content: info.publishedAt?.toISOString(),
        },
        {
          property: 'article:author',
          content: twitter ? `https://twitter.com/${twitter}` : null,
        },
        {
          property: 'twitter:creator',
          content: twitter ? `@${twitter}` : null,
        },
      );
    }
    return baseTags.filter((tag): tag is MetaDefinition => tag.content != null);
  }

  private _pathToUrl(path: string) {
    return new URL(path, this._platformInfo.getOrigin()).href;
  }
}
