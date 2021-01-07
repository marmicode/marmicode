import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/frame-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-text',
  template: `<ng-container *ngIf="token.tokens"
      ><mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens
    ></ng-container>
    <span *ngIf="!token.tokens">{{ token.raw }}</span> `,
})
export class MarkdownTextComponent {
  @Input() token: MarkdownTokens.Text & { tokens?: MarkdownToken[] };
}
