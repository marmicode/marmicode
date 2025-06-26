import { NgComponentOutlet, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-heading',
  template: `
    <h1 *ngIf="token.depth === 1">
      <ng-container *ngTemplateOutlet="contentTpl" />
    </h1>
    <h2 *ngIf="token.depth === 2">
      <ng-container *ngTemplateOutlet="contentTpl" />
    </h2>
    <h3 *ngIf="token.depth === 3">
      <ng-container *ngTemplateOutlet="contentTpl" />
    </h3>
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
  imports: [NgIf, NgComponentOutlet, NgTemplateOutlet],
})
export class MarkdownHeadingComponent {
  @Input() token: MarkdownTokens.Heading & { tokens?: MarkdownToken[] };

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
