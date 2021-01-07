import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Tokens } from 'marked';
import { HighlightLinkComponent } from '../highlight/highlight-link.component';

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
  @Input() token: Tokens.List;
}
