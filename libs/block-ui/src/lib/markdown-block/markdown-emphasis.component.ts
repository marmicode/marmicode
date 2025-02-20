import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';
import { MarkdownTokensComponent } from './markdown-tokens.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-markdown-emphasis',
    template: `<em>
    <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
  </em>`,
    standalone: true,
    imports: [MarkdownTokensComponent],
})
export class MarkdownEmphasisComponent {
  @Input() token: MarkdownTokens.Em & { tokens?: MarkdownToken[] };
}
