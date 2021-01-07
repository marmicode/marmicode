import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens, TokensList } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-text',
  template: `<ng-container *ngIf="token.tokens"
      ><mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens
    ></ng-container>
    <span *ngIf="!token.tokens">{{ token.raw }}</span> `,
})
export class MarkdownTextComponent {
  @Input() token: Tokens.Text & { tokens?: TokensList };
}
