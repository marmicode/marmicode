import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens, TokensList } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-strong',
  template: `<strong
    ><mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens
  ></strong>`,
})
export class MarkdownStrongComponent {
  @Input() token: Tokens.Strong & { tokens?: TokensList };
}
