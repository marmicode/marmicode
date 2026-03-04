import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  effect,
  inject,
  input,
} from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

export interface BasicPageInfo {
  description?: string;
  alternates?: Array<{ href: string; language: string }>;
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

  private _metaService = inject(Meta);
  private _titleService = inject(Title);
  private _defaultTitle = 'Marmicode';

  constructor() {
    /* Sync input with page title. */
    effect((onCleanup) => {
      this._titleService.setTitle(this._infoToTitle(this.info()));
      onCleanup(() => {
        this._titleService.setTitle(this._defaultTitle);
      });
    });

    /* Update meta data. */
    effect((onCleanup) => {
      const metas = this._infoToMetaTags(this.info());
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
}

@NgModule({
  exports: [PageComponent],
  imports: [CommonModule, PageComponent],
})
export class PageModule {}
