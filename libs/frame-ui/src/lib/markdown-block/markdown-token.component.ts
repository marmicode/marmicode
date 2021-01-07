import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Token } from 'marked';

export enum TokenType {
  ListItem = 'list_item',
  List = 'list',
  Paragraph = 'paragraph',
  Text = 'text',
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token',
  template: `
    <ng-container [ngSwitch]="token.type">
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

      <!-- List item. -->
      <mc-markdown-text
        *ngSwitchCase="TokenType.Text"
        [token]="token"
      ></mc-markdown-text>

      <div *ngSwitchDefault>{{ token.type }}</div>
    </ng-container>
  `,
})
export class MarkdownTokenComponent {
  @Input() token: Token;

  TokenType = TokenType;
}
