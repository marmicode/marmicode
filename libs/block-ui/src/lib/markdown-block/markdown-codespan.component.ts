import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownTokens } from '@marmicode/block-core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-markdown-codespan',
    template: ` <code>{{ token.text }}</code> `,
    standalone: true,
})
export class MarkdownCodespanComponent {
  @Input() token: MarkdownTokens.Codespan;
}
