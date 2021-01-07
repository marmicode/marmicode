import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token-list-item',
  template: `🚧 markdown-token-list-item`,
})
export class MarkdownTokenListItemComponent {
  @Input() token: Tokens.ListItem;
}
