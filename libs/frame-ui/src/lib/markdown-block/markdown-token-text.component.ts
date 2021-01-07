import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens, TokensList } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token-text',
  template: `<ng-container *ngIf="token.tokens"
      ><mc-markdown-token
        *ngFor="let item of token.tokens"
        [token]="item"
      ></mc-markdown-token
    ></ng-container>
    <span *ngIf="!token.tokens">{{ token.raw }}</span> `,
})
export class MarkdownTokenTextComponent {
  @Input() token: Tokens.Text & { tokens?: TokensList };
}
