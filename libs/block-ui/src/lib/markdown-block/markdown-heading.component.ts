import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-heading',
  template: ` <h1 *ngIf="token.depth === 1">
      <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
    </h1>
    <h2 *ngIf="token.depth === 2">
      <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
    </h2>
    <h3 *ngIf="token.depth === 3">
      <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
    </h3>`,
})
export class MarkdownHeadingComponent {
  @Input() token: MarkdownTokens.Heading & { tokens?: MarkdownToken[] };
}
