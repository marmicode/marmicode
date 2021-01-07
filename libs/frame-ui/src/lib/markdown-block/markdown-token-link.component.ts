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
  selector: 'mc-markdown-token-link',
  template: ` <mc-highlight-link
      *ngIf="isHighlightLink"
      [color]="color"
      [href]="token.href"
      ><mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens
    ></mc-highlight-link>
    <a *ngIf="!isHighlightLink" [href]="token.href" target="_blank">
      <mc-markdown-tokens [tokens]="token.tokens"></mc-markdown-tokens>
    </a>`,
})
export class MarkdownTokenLinkComponent implements OnChanges {
  @Input() token: Tokens.Link;
  color: string;
  isHighlightLink: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.token) {
      const href = this.token.href;
      this.color = HighlightLinkComponent.getColor({
        highlightableZones: [],
        href,
      });
      this.isHighlightLink = HighlightLinkComponent.canHandleLink(href);
    }
  }
}
