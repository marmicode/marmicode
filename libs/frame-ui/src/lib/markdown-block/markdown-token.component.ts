import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
    <ng-container [ngSwitch]="token.type">
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
      <p *ngSwitchCase="TokenType.Paragraph">{{ token.text }}</p>

      <!-- Text. -->
      <mc-markdown-token-text
        *ngSwitchCase="TokenType.Text"
        [token]="token"
      ></mc-markdown-token-text>

      <div *ngSwitchDefault>{{ token.type }}</div>
    </ng-container>
  `,
})
export class MarkdownTokenComponent {
  @Input() token: Token;

  TokenType = TokenType;
}
