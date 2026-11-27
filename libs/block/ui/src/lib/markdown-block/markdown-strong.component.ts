import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block/core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-strong',
  template: `<strong>
    <ng-container
      *ngComponentOutlet="
        MarkdownTokensComponent() ?? null;
        inputs: { tokens: token.tokens }
      "
    ></ng-container>
  </strong>`,
  styles: `
    strong {
      color: var(--mc-dark-text);
      font-weight: 600;
    }
  `,
  imports: [NgComponentOutlet],
})
export class MarkdownStrongComponent {
  @Input() token!: MarkdownTokens.Strong & { tokens?: MarkdownToken[] };

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
