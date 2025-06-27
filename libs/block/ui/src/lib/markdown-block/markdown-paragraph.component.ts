import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-paragraph',
  template: ` <p>
    <ng-container
      *ngComponentOutlet="
        MarkdownTokensComponent();
        inputs: { tokens: token.tokens }
      "
    ></ng-container>
  </p>`,
  imports: [NgComponentOutlet],
})
export class MarkdownParagraphComponent {
  @Input() token: MarkdownTokens.Paragraph & { tokens?: MarkdownToken[] };

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
