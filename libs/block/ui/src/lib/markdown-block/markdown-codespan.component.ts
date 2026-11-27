import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownTokens } from '@marmicode/block/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-codespan',
  template: ` <code>{{ token.text }}</code> `,
  styles: `
    :host-context(.mc-page-dark) code {
      padding: 0.12em 0.42em;
      border: 1px solid var(--mc-dark-line);
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.07);
      color: var(--mc-dark-text);
      font-family: var(--mc-font-mono);
      font-size: 0.86em;
    }
  `,
})
export class MarkdownCodespanComponent {
  @Input() token!: MarkdownTokens.Codespan;
}
