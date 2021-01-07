import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/frame-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-paragraph',
  template: ` <p>
    <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
  </p>`,
})
export class MarkdownParagraphComponent {
  @Input() token: MarkdownTokens.Paragraph & { tokens?: MarkdownToken[] };
}
