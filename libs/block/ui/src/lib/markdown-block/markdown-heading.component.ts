import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block/core';
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
      <h2>
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
          MarkdownTokensComponent();
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
    `,
  ],
  imports: [NgComponentOutlet, NgTemplateOutlet],
})
export class MarkdownHeadingComponent {
  @Input() token: MarkdownTokens.Heading & { tokens?: MarkdownToken[] };

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
