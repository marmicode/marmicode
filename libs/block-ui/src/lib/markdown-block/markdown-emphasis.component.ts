import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-emphasis',
  template: `<em>
    <ng-container
      *ngComponentOutlet="
        MarkdownTokensComponent();
        inputs: { tokens: token.tokens }
      "
    />
  </em>`,
  imports: [NgComponentOutlet],
})
export class MarkdownEmphasisComponent {
  @Input() token: MarkdownTokens.Em & { tokens?: MarkdownToken[] };

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
