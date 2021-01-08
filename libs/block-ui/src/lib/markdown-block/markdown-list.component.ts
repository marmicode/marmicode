import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownTokens } from '@marmicode/block-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-list',
  template: ` <ul>
    <mc-markdown-token
      *ngFor="let item of token.items"
      [token]="item"
    ></mc-markdown-token>
  </ul>`,
})
export class MarkdownListComponent {
  @Input() token: MarkdownTokens.List;
}
