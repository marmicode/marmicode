import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken } from '@marmicode/block/core';

import { MarkdownTokenComponent } from './markdown-token.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-tokens',
  template: ` @for (token of tokens; track token) {
  <mc-markdown-token
    [token]="token"
  ></mc-markdown-token>
}`,
  imports: [MarkdownTokenComponent],
})
export class MarkdownTokensComponent {
  @Input() tokens: MarkdownToken[];
}
