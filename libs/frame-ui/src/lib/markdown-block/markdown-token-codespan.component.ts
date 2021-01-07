import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens, TokensList } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token-codespan',
  template: ` <code>{{ token.text }}</code> `,
})
export class MarkdownTokenCodespanComponent {
  @Input() token: Tokens.Codespan;
}
