import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens, TokensList } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-codespan',
  template: ` <code>{{ token.text }}</code> `,
})
export class MarkdownCodespanComponent {
  @Input() token: Tokens.Codespan;
}
