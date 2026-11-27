import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownToken } from '@marmicode/block/core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-blockquote',
  template: ` <blockquote>
    <ng-container
      *ngComponentOutlet="
        MarkdownTokensComponent() ?? null;
        inputs: { tokens: token.tokens }
      "
    />
  </blockquote>`,
  styles: [
    `
      /* A callout. */
      blockquote {
        margin: 1.6em 0;
        padding: 2px 20px;
        border: 1px solid rgba(var(--mc-accent-rgb), 0.35);
        border-radius: 16px;
        background: linear-gradient(
          160deg,
          rgba(var(--mc-accent-rgb), 0.12),
          rgba(26, 17, 32, 0.6) 70%
        );
        font-size: 16px;
        line-height: 1.65;
      }
    `,
  ],
  imports: [NgComponentOutlet],
})
export class MarkdownBlockquoteComponent {
  @Input() token!: MarkdownToken;

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
