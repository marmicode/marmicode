import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/frame-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-strong',
  template: `<strong
    ><mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens
  ></strong>`,
})
export class MarkdownStrongComponent {
  @Input() token: MarkdownTokens.Strong & { tokens?: MarkdownToken[] };
}
