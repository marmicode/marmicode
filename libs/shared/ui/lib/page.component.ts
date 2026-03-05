import { CommonModule, PlatformLocation } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  effect,
  inject,
  input,
} from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { HtmlAdapter } from './html-adapter';

export interface BasicPageInfo {
  description?: string;
  alternates?: Array<{ path: string; language: string }>;
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
  template: `<ng-content />`,
  styles: `
    :host {
      display: block;
      background-color: white;
      min-height: 100%;
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
  private _platformLocation = inject(PlatformLocation);

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

      if (info.alternates) {
        const tags = info.alternates.map((alternate) =>
          this._htmlAdapter.upsertLinkTag({
            rel: 'alternate',
            hreflang: alternate.language,
            href: this._pathToUrl(alternate.path),
          }),
        );

        const englishAlternate = info.alternates.find(
          (alternate) => alternate.language === this._defaultLanguage,
        );
        if (englishAlternate) {
          const href = this._pathToUrl(englishAlternate.path);
          tags.push(
            this._htmlAdapter.upsertLinkTag({
              rel: 'canonical',
              href,
            }),
            this._htmlAdapter.upsertLinkTag({
              rel: 'alternate',
              href,
              hreflang: 'x-default',
            }),
          );
        }

        onCleanup(() => {
          tags.forEach((tag) => tag.remove());
        });
      }

      /* Update meta data. */
      const metas = this._infoToMetaTags(info);
      if ('type' in info && info.type === 'article') {
        metas.push({
          property: 'article:author',
          content: info.author?.twitter
            ? `https://twitter.com/${info.author.twitter}`
            : null,
        });
      }
      const tagEls = this._metaService.addTags(metas);
      onCleanup(() => {
        tagEls.forEach((el) => this._metaService.removeTagElement(el));
      });
    });
  }

  private _infoToTitle(info: PageInfo) {
    return info.title ? `${info.title} | Marmicode` : this._defaultTitle;
  }

  private _infoToMetaTags(info: PageInfo): MetaDefinition[] {
    let tags = [
      { name: 'description', content: info.description },
      { property: 'og:description', content: info.description },
      { property: 'og:image', content: info.pictureUri },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: info.description },
      { property: 'twitter:title', content: this._infoToTitle(info) },
    ];
    if ('type' in info && info.type === 'article') {
      const twitter = info.author?.twitter;
      tags = [
        ...tags,
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
      ];
    }
    return tags.filter((tag) => tag.content != null);
  }

  private _pathToUrl(path: string) {
    const { protocol, hostname, port } = this._platformLocation;
    return new URL(path, `${protocol}//${hostname}:${port}`).toString();
  }
}

@NgModule({
  exports: [PageComponent],
  imports: [CommonModule, PageComponent],
})
export class PageModule {}
