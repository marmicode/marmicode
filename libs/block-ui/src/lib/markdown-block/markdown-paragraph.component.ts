import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';
import { MarkdownTokensComponent } from './markdown-tokens.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-markdown-paragraph',
    template: ` <p>
    <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
  </p>`,
    standalone: true,
    imports: [MarkdownTokensComponent],
})
export class MarkdownParagraphComponent {
  @Input() token: MarkdownTokens.Paragraph & { tokens?: MarkdownToken[] };
}
