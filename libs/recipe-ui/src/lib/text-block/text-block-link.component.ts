import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { isHighlightLink } from '../highlight/parse-highlight-link';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-text-block-link',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        cursor: pointer;
        border-bottom: 1px solid currentColor;
      }
    `,
  ],
})
export class TextBlockLinkComponent {
  @Input() href: string;

  static canHandleLink(href: string) {
    return isHighlightLink(href);
  }
}

@NgModule({
  declarations: [TextBlockLinkComponent],
  exports: [TextBlockLinkComponent],
  imports: [CommonModule],
})
export class TextBlockLinkModule {}
