import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownTokens } from '@marmicode/block-core';
import { NgFor } from '@angular/common';
import { MarkdownTokenComponent } from './markdown-token.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-markdown-list',
    template: ` <ul>
    <mc-markdown-token
      *ngFor="let item of token.items"
      [token]="item"
    ></mc-markdown-token>
  </ul>`,
    standalone: true,
    imports: [NgFor, MarkdownTokenComponent],
})
export class MarkdownListComponent {
  @Input() token: MarkdownTokens.List;
}
