import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken } from '@marmicode/block-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-blockquote',
  template: `<blockquote>
    <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
  </blockquote>`,
  styles: [
    `
      blockquote {
        color: rgba(117, 117, 117, 1);
        font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
        font-size: 1.5em;
        line-height: 1.5em;
      }
    `,
  ],
})
export class MarkdownBlockquoteComponent {
  @Input() token: MarkdownToken;
}
