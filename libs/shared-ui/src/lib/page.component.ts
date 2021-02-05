import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnDestroy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';

export interface ArticlePageMeta {
  type: 'article';
  author?: {
    name: string;
    twitter?: string;
  };
  description?: string;
  pictureUri?: string;
  publishedAt?: Date;
  title?: string;
}

export function createArticlePageMeta(
  meta: Omit<ArticlePageMeta, 'type'>
): ArticlePageMeta {
  return {
    ...meta,
    type: 'article',
  };
}

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
  @Input() set title(title: string) {
    this._state.set({ title });
  }

  private _defaultTitle = 'Marmicode';

  constructor(
    private _state: RxState<{ title: string; test: boolean }>,
    private _titleService: Title
  ) {
    /* Initialize title. */
    this._state.set({ title: null });

    /* Sync input with page title. */
    this._state.hold(
      this._state
        .select('title')
        .pipe(
          map((title) => (title ? `${title} | Marmicode` : this._defaultTitle))
        ),
      (title) => this._titleService.setTitle(title)
    );
  }

  ngOnDestroy() {
    this._titleService.setTitle(this._defaultTitle);
  }
}

@NgModule({
  declarations: [PageComponent],
  exports: [PageComponent],
  imports: [CommonModule],
})
export class PageModule {}
