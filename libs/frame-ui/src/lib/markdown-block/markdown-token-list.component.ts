import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tokens } from 'marked';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-token-list',
  template: ` <ul>
    <ng-container *ngFor="let item of token.items">
      <mc-markdown-token [token]="item"></mc-markdown-token>
    </ng-container>
  </ul>`,
})
export class MarkdownTokenListComponent {
  @Input() token: Tokens.List;
}
