import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens, TokensList } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token-list-item',
  template: `<li>
    <mc-markdown-token
      *ngFor="let item of token.tokens"
      [token]="item"
    ></mc-markdown-token>
  </li>`,
})
export class MarkdownTokenListItemComponent {
  @Input() token: Tokens.ListItem & { tokens: TokensList };
}
