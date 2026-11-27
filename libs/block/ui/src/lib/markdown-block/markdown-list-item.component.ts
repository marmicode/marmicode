import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block/core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-list-item',
  template: `<li>
    <ng-container
      *ngComponentOutlet="
        MarkdownTokensComponent() ?? null;
        inputs: { tokens: token.tokens }
      "
    ></ng-container>
  </li>`,
  styles: `
    :host-context(.mc-page-dark) li {
      margin-top: 0.4em;

      &::marker {
        color: var(--mc-accent);
      }
    }
  `,
  imports: [NgComponentOutlet],
})
export class MarkdownListItemComponent {
  @Input() token!: MarkdownTokens.ListItem & { tokens?: MarkdownToken[] };

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
