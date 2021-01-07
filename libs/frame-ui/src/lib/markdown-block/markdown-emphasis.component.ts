import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens, TokensList } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-emphasis',
  template: `<em
    ><mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens
  ></em>`,
})
export class MarkdownEmphasisComponent {
  @Input() token: Tokens.Em & { tokens?: TokensList };
}
