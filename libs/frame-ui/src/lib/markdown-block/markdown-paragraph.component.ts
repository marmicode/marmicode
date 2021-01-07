import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Token, Tokens } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-paragraph',
  template: ` <p>
    <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
  </p>`,
})
export class MarkdownParagraphComponent {
  @Input() token: Tokens.Paragraph & { tokens?: Token[] };
}
