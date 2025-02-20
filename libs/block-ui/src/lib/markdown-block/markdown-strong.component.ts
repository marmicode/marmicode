import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';
import { MarkdownTokensComponent } from './markdown-tokens.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-markdown-strong',
    template: `<strong
    ><mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens
  ></strong>`,
    standalone: true,
    imports: [MarkdownTokensComponent],
})
export class MarkdownStrongComponent {
  @Input() token: MarkdownTokens.Strong & { tokens?: MarkdownToken[] };
}
