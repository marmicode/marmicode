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
        MarkdownTokensComponent();
        inputs: { tokens: token.tokens }
      "
    />
  </blockquote>`,
  styles: [
    `
      blockquote {
        color: rgba(117, 117, 117, 1);
        font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
        font-size: 1.5em;
        line-height: 1.5em;
      }
    `,
  ],
  imports: [NgComponentOutlet],
})
export class MarkdownBlockquoteComponent {
  @Input() token: MarkdownToken;

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
