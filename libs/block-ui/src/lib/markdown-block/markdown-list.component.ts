import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rxComputed } from '@jscutlery/rx-computed';
import { MarkdownTokens } from '@marmicode/block-core';
import { markdownTokensLoader } from './markdown-tokens-loader';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-list',
  template: ` <ul>
    <ng-container
      *ngComponentOutlet="
        MarkdownTokensComponent();
        inputs: { tokens: token.items }
      "
    ></ng-container>
  </ul>`,
  imports: [NgComponentOutlet],
})
export class MarkdownListComponent {
  @Input() token: MarkdownTokens.List;

  MarkdownTokensComponent = rxComputed(markdownTokensLoader);
}
