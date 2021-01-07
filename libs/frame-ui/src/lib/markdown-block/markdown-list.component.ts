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
    <ng-container *ngFor="let item of token.items">
      <mc-markdown-token [token]="item"></mc-markdown-token>
    </ng-container>
  </ul>`,
})
export class MarkdownListComponent {
  @Input() token: Tokens.List;
}
