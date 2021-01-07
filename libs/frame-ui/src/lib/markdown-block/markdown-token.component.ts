import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { getMarkdownTokenType, MarkdownToken } from '@marmicode/frame-core';

export enum TokenType {
  Code = 'code',
  Codespan = 'codespan',
  Emphasis = 'em',
  Link = 'link',
  List = 'list',
  ListItem = 'list_item',
  Paragraph = 'paragraph',
  Space = 'space',
  Strong = 'strong',
  Text = 'text',
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token',
  template: `
    <ng-container [ngSwitch]="type">
      <!-- Code. -->
      <mc-markdown-code
        *ngSwitchCase="TokenType.Code"
        [token]="token"
      ></mc-markdown-code>

      <!-- Codespan. -->
      <mc-markdown-codespan
        *ngSwitchCase="TokenType.Codespan"
        [token]="token"
      ></mc-markdown-codespan>

      <!-- Emphasis. -->
      <mc-markdown-emphasis
        *ngSwitchCase="TokenType.Emphasis"
        [token]="token"
      ></mc-markdown-emphasis>

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

      <!-- Strong. -->
      <mc-markdown-strong
        *ngSwitchCase="TokenType.Strong"
        [token]="token"
      ></mc-markdown-strong>

      <!-- Text. -->
      <mc-markdown-text
        *ngSwitchCase="TokenType.Text"
        [token]="token"
      ></mc-markdown-text>
    </ng-container>
  `,
})
export class MarkdownTokenComponent implements OnChanges {
  @Input() token: MarkdownToken;
  TokenType = TokenType;
  type: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.token) {
      this.type = getMarkdownTokenType(this.token);

      /* Log unsupported types. */
      if (!(Object.values(TokenType) as string[]).includes(this.type)) {
        console.warn(`Unsupported markdown token: ${this.type}.`);
      }
    }
  }
}
