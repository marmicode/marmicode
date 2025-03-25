import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownToken } from '@marmicode/block-core';
import { NgFor } from '@angular/common';
import { MarkdownTokenComponent } from './markdown-token.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-markdown-tokens',
  template: ` <mc-markdown-token
    *ngFor="let token of tokens"
    [token]="token"
  ></mc-markdown-token>`,
  imports: [NgFor, MarkdownTokenComponent],
})
export class MarkdownTokensComponent {
  @Input() tokens: MarkdownToken[];
}
