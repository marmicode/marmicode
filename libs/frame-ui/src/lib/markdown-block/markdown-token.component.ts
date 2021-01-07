import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Token } from 'marked';

export enum TokenType {
  Codespan = 'codespan',
  Link = 'link',
  List = 'list',
  ListItem = 'list_item',
  Paragraph = 'paragraph',
  Text = 'text',
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token',
  template: `
    <ng-container [ngSwitch]="type">
      <!-- Codespan. -->
      <mc-markdown-token-codespan
        *ngSwitchCase="TokenType.Codespan"
        [token]="token"
      ></mc-markdown-token-codespan>

      <!-- Link. -->
      <mc-markdown-token-link
        *ngSwitchCase="TokenType.Link"
        [token]="token"
      ></mc-markdown-token-link>

      <!-- List. -->
      <mc-markdown-token-list
        *ngSwitchCase="TokenType.List"
        [token]="token"
      ></mc-markdown-token-list>

      <!-- List item. -->
      <mc-markdown-token-list-item
        *ngSwitchCase="TokenType.ListItem"
        [token]="token"
      ></mc-markdown-token-list-item>

      <!-- Paragraph. -->
      <mc-markdown-paragraph
        *ngSwitchCase="TokenType.Paragraph"
        [token]="token"
      ></mc-markdown-paragraph>

      <!-- Text. -->
      <mc-markdown-token-text
        *ngSwitchCase="TokenType.Text"
        [token]="token"
      ></mc-markdown-token-text>

      <div *ngSwitchDefault>🚧 {{ type }}</div>
    </ng-container>
  `,
})
export class MarkdownTokenComponent implements OnChanges {
  @Input() token: Token;
  TokenType = TokenType;
  type: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.token) {
      /* @hack to fix typing issue as `Token` is a union including
       * a `Def` type that doesn't have a `type` property. */
      this.type = 'type' in this.token ? this.token.type : null;
    }
  }
}
