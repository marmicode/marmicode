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
      <mc-markdown-codespan
        *ngSwitchCase="TokenType.Codespan"
        [token]="token"
      ></mc-markdown-codespan>

      <!-- Link. -->
      <mc-markdown-link
        *ngSwitchCase="TokenType.Link"
        [token]="token"
      ></mc-markdown-link>

      <!-- List. -->
      <mc-markdown-list
        *ngSwitchCase="TokenType.List"
        [token]="token"
      ></mc-markdown-list>

      <!-- List item. -->
      <mc-markdown-list-item
        *ngSwitchCase="TokenType.ListItem"
        [token]="token"
      ></mc-markdown-list-item>

      <!-- Paragraph. -->
      <mc-markdown-paragraph
        *ngSwitchCase="TokenType.Paragraph"
        [token]="token"
      ></mc-markdown-paragraph>

      <!-- Text. -->
      <mc-markdown-text
        *ngSwitchCase="TokenType.Text"
        [token]="token"
      ></mc-markdown-text>

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