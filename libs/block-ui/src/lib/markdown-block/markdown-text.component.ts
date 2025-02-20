import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';
import { NgIf } from '@angular/common';
import { MarkdownTokensComponent } from './markdown-tokens.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-markdown-text',
    template: `<ng-container *ngIf="token.tokens"
      ><mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens
    ></ng-container>
    <span *ngIf="!token.tokens">{{ token.raw }}</span> `,
    standalone: true,
    imports: [NgIf, MarkdownTokensComponent],
})
export class MarkdownTextComponent {
  @Input() token: MarkdownTokens.Text & { tokens?: MarkdownToken[] };
}
