import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-emphasis',
  template: `<em>
    <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
  </em>`,
})
export class MarkdownEmphasisComponent {
  @Input() token: MarkdownTokens.Em & { tokens?: MarkdownToken[] };
}
