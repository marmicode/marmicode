import { NgComponentOutlet, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-text',
  template: `<ng-container *ngIf="token.tokens">
      <ng-container
        *ngComponentOutlet="
          MarkdownTokensComponent();
          inputs: { tokens: token.tokens }
        "
      ></ng-container>
    </ng-container>
    <span *ngIf="!token.tokens">{{ token.raw }}</span> `,
  imports: [NgIf, NgComponentOutlet],
})
export class MarkdownTextComponent {
  @Input() token: MarkdownTokens.Text & { tokens?: MarkdownToken[] };

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
