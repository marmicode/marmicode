import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-list',
  template: ` <ul>
    <li *ngFor="let item of token.items">
      {{ item.text }}
    </li>
  </ul>`,
})
export class MarkdownTokenListComponent {
  @Input() token: Tokens.List;
}
