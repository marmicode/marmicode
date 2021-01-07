import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token-link',
  template: `<a [href]="token.href" target="_blank">{{ token.text }}</a>`,
})
export class MarkdownTokenLinkComponent {
  @Input() token: Tokens.Link;
}
