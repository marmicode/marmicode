import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import {
  getMarkdownHeadingId,
  MarkdownToken,
  MarkdownTokens,
} from '@marmicode/block/core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-heading',
  template: `
    @if (token.depth === 1) {
      <h1>
        <ng-container *ngTemplateOutlet="contentTpl" />
      </h1>
    }
    @if (token.depth === 2) {
      <!-- The id lets a table of contents link to the section. -->
      <h2 [id]="id">
        <ng-container *ngTemplateOutlet="contentTpl" />
      </h2>
    }
    @if (token.depth === 3) {
      <h3>
        <ng-container *ngTemplateOutlet="contentTpl" />
      </h3>
    }
    <ng-template #contentTpl>
      <ng-container
        *ngComponentOutlet="
          MarkdownTokensComponent() ?? null;
          inputs: { tokens: token.tokens }
        "
      />
    </ng-template>
  `,
  styles: [
    `
      h1 {
        font-size: 1.5em;
        font-weight: 500;
        margin-top: 30px;
      }

      h1,
      h2,
      h3 {
        line-height: 1.2em;
      }

      :host-context(.mc-page-dark) {
        h1,
        h2,
        h3 {
          color: var(--mc-dark-text);
          font-weight: 650;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }

        h2 {
          margin: 2em 0 0.7em;
          font-size: 30px;
          /* Keeps the heading clear of the floating nav when jumping to it. */
          scroll-margin-top: 96px;
        }

        h3 {
          margin: 1.6em 0 0.6em;
          font-size: 22px;
          letter-spacing: -0.02em;
        }
      }
    `,
  ],
  imports: [NgComponentOutlet, NgTemplateOutlet],
})
export class MarkdownHeadingComponent {
  @Input() token!: MarkdownTokens.Heading & { tokens?: MarkdownToken[] };

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);

  get id() {
    return getMarkdownHeadingId(this.token);
  }
}
