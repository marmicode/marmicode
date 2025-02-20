import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken, MarkdownTokens } from '@marmicode/block-core';
import { NgFor } from '@angular/common';
import { MarkdownTokenComponent } from './markdown-token.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-markdown-list-item',
    template: `<li>
    <mc-markdown-token
      *ngFor="let item of token.tokens"
      [token]="item"
    ></mc-markdown-token>
  </li>`,
    standalone: true,
    imports: [NgFor, MarkdownTokenComponent],
})
export class MarkdownListItemComponent {
  @Input() token: MarkdownTokens.ListItem & { tokens?: MarkdownToken[] };
}
