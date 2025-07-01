import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  getMarkdownTokenType,
  MarkdownToken,
  MarkdownTokenType,
} from '@marmicode/block/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { MarkdownBlockquoteComponent } from './markdown-blockquote.component';
import { MarkdownCodeComponent } from './markdown-code.component';
import { MarkdownCodespanComponent } from './markdown-codespan.component';
import { MarkdownEmphasisComponent } from './markdown-emphasis.component';
import { MarkdownHeadingComponent } from './markdown-heading.component';
import { MarkdownLinkComponent } from './markdown-link.component';
import { MarkdownListComponent } from './markdown-list.component';
import { MarkdownListItemComponent } from './markdown-list-item.component';
import { MarkdownMediaComponent } from './markdown-media.component';
import { MarkdownParagraphComponent } from './markdown-paragraph.component';
import { MarkdownStrongComponent } from './markdown-strong.component';
import { MarkdownTextComponent } from './markdown-text.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token',
  template: `
    <ng-container [ngSwitch]="type">
      <!-- Blockquote. -->
      <mc-markdown-blockquote
        *ngSwitchCase="TokenType.Blockquote"
        [token]="tokenAsAny"
      ></mc-markdown-blockquote>

      <!-- Code. -->
      <mc-markdown-code
        *ngSwitchCase="TokenType.Code"
        [token]="tokenAsAny"
      ></mc-markdown-code>

      <!-- Codespan. -->
      <mc-markdown-codespan
        *ngSwitchCase="TokenType.Codespan"
        [token]="tokenAsAny"
      ></mc-markdown-codespan>

      <!-- Emphasis. -->
      <mc-markdown-emphasis
        *ngSwitchCase="TokenType.Emphasis"
        [token]="tokenAsAny"
      ></mc-markdown-emphasis>

      <!-- Heading. -->
      <mc-markdown-heading
        *ngSwitchCase="TokenType.Heading"
        [token]="tokenAsAny"
      ></mc-markdown-heading>

      <!-- Horizontal Rule. -->
      <hr *ngSwitchCase="TokenType.HorizontalRule" />
      <!-- Link. -->
      <mc-markdown-link
        *ngSwitchCase="TokenType.Link"
        [token]="tokenAsAny"
      ></mc-markdown-link>

      <!-- List. -->
      <mc-markdown-list
        *ngSwitchCase="TokenType.List"
        [token]="tokenAsAny"
      ></mc-markdown-list>

      <!-- List item. -->
      <mc-markdown-list-item
        *ngSwitchCase="TokenType.ListItem"
        [token]="tokenAsAny"
      ></mc-markdown-list-item>

      <!-- Media: Image or Video. -->
      <mc-markdown-media
        *ngSwitchCase="TokenType.Media"
        [token]="tokenAsAny"
      ></mc-markdown-media>

      <!-- Paragraph. -->
      <mc-markdown-paragraph
        *ngSwitchCase="TokenType.Paragraph"
        [token]="tokenAsAny"
      ></mc-markdown-paragraph>

      <!-- Strong. -->
      <mc-markdown-strong
        *ngSwitchCase="TokenType.Strong"
        [token]="tokenAsAny"
      ></mc-markdown-strong>

      <!-- Text. -->
      <mc-markdown-text
        *ngSwitchCase="TokenType.Text"
        [token]="tokenAsAny"
      ></mc-markdown-text>
    </ng-container>
  `,
  imports: [
    NgSwitch,
    NgSwitchCase,
    MarkdownBlockquoteComponent,
    MarkdownCodeComponent,
    MarkdownCodespanComponent,
    MarkdownEmphasisComponent,
    MarkdownHeadingComponent,
    MarkdownLinkComponent,
    MarkdownListComponent,
    MarkdownListItemComponent,
    MarkdownMediaComponent,
    MarkdownParagraphComponent,
    MarkdownStrongComponent,
    MarkdownTextComponent,
  ],
})
export class MarkdownTokenComponent implements OnChanges {
  @Input() token: MarkdownToken;
  TokenType = MarkdownTokenType;
  type: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.token) {
      this.type = getMarkdownTokenType(this.token);

      /* Log unsupported types. */
      if (!(Object.values(MarkdownTokenType) as string[]).includes(this.type)) {
        console.warn(`Unsupported markdown token: ${this.type}.`);
      }
    }
  }

  /* @hack bypass typing as we will dynamically choose the child component. */
  get tokenAsAny() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.token as any;
  }
}
