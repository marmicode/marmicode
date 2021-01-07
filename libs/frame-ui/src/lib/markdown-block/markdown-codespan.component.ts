import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownTokens } from '@marmicode/frame-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-codespan',
  template: ` <code>{{ token.text }}</code> `,
})
export class MarkdownCodespanComponent {
  @Input() token: MarkdownTokens.Codespan;
}
