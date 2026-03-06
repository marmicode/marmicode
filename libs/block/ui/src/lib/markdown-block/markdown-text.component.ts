import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block/core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-text',
  template: `@if (token.tokens && MarkdownTokensComponent(); as comp) {
  <ng-container
        *ngComponentOutlet="comp; inputs: { tokens: token.tokens }"
  ></ng-container>
}
@if (!token.tokens) {
  <span>{{ token.raw }}</span>
}`,
  imports: [NgComponentOutlet],
})
export class MarkdownTextComponent {
  @Input() token!: MarkdownTokens.Text & { tokens?: MarkdownToken[] };

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
