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
    @switch (type) {
      <!-- Blockquote. -->
      @case (TokenType.Blockquote) {
        <mc-markdown-blockquote [token]="tokenAsAny" />
      }
      <!-- Code. -->
      @case (TokenType.Code) {
        <mc-markdown-code [token]="tokenAsAny" />
      }
      <!-- Codespan. -->
      @case (TokenType.Codespan) {
        <mc-markdown-codespan [token]="tokenAsAny" />
      }
      <!-- Emphasis. -->
      @case (TokenType.Emphasis) {
        <mc-markdown-emphasis [token]="tokenAsAny" />
      }
      <!-- Heading. -->
      @case (TokenType.Heading) {
        <mc-markdown-heading [token]="tokenAsAny" />
      }
      <!-- Horizontal Rule. -->
      @case (TokenType.HorizontalRule) {
        <hr />
      }
      <!-- Link. -->
      @case (TokenType.Link) {
        <mc-markdown-link [token]="tokenAsAny" />
      }
      <!-- List. -->
      @case (TokenType.List) {
        <mc-markdown-list [token]="tokenAsAny" />
      }
      <!-- List item. -->
      @case (TokenType.ListItem) {
        <mc-markdown-list-item [token]="tokenAsAny" />
      }
      <!-- Media: Image or Video. -->
      @case (TokenType.Media) {
        <mc-markdown-media [token]="tokenAsAny" />
      }
      <!-- Paragraph. -->
      @case (TokenType.Paragraph) {
        <mc-markdown-paragraph [token]="tokenAsAny" />
      }
      <!-- Strong. -->
      @case (TokenType.Strong) {
        <mc-markdown-strong [token]="tokenAsAny" />
      }
      <!-- Text. -->
      @case (TokenType.Text) {
        <mc-markdown-text [token]="tokenAsAny" />
      }
    }
  `,
  imports: [
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
    if ('token' in changes) {
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
