import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnDestroy,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';

export interface BasicPageInfo {
  description?: string;
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
  meta: Omit<ArticlePageInfo, 'type'>
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
  template: ` <ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: block;
        background-color: white;
        min-height: 100%;
      }
    `,
  ],
  providers: [RxState],
})
export class PageComponent implements OnDestroy {
  @Input() set info(info: PageInfo) {
    this._state.set({ info });
  }

  private _defaultTitle = 'Marmicode';

  constructor(
    private _metaService: Meta,
    private _state: RxState<{ info: PageInfo }>,
    private _titleService: Title
  ) {
    /* Intialize info. */
    this._state.set({ info: null });

    /* Sync input with page title. */
    this._state.hold(
      this._state.select('info').pipe(map((info) => this._infoToTitle(info))),
      (title) => this._titleService.setTitle(title)
    );

    /* Update meta data. */
    this._state.hold(this._state.select('info'), (info) => {
      this._resetMeta();

      /* Nothing to do. */
      if (info == null) {
        return;
      }

      /* Basic info. */
      let tags = [
        { name: 'description', content: info.description },
        { property: 'og:description', content: info.description },
        { property: 'og:image', content: info.pictureUri },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:description', content: info.description },
        { property: 'twitter:title', content: this._infoToTitle(info) },
      ];

      /* Article. */
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

      this._metaService.addTags(
        tags
          /* Ignore null values. */
          .filter((tag) => tag.content != null)
      );
    });
  }

  ngOnDestroy() {
    this._resetMeta();
    this._titleService.setTitle(this._defaultTitle);
  }

  private _infoToTitle(info: PageInfo) {
    return info?.title ? `${info.title} | Marmicode` : this._defaultTitle;
  }

  private _resetMeta() {
    this._metaService.removeTag('name="author"');
    this._metaService.removeTag('name="description"');
    this._metaService.removeTag('property="og:type"');
    this._metaService.removeTag('property="og:description"');
    this._metaService.removeTag('property="og:image"');
    this._metaService.removeTag('property="article:published_time"');
    this._metaService.removeTag('property="article:author"');
    this._metaService.removeTag('property="twitter:card"');
    this._metaService.removeTag('property="twitter:creator"');
    this._metaService.removeTag('property="twitter:description"');
    this._metaService.removeTag('property="twitter:title"');
  }
}

@NgModule({
  declarations: [PageComponent],
  exports: [PageComponent],
  imports: [CommonModule],
})
export class PageModule {}
