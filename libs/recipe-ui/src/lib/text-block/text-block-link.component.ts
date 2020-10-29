import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { createHighlightSection, HighlightSection } from '../highlight-info';

export const linesPrefix = 'lines://';

/**
 * Parses `lines://1,3-4,5`.
 * @returns [{start: 1, end: 1}, {start: 3, end: 4}, ...]
 */
export function parseLinesHref(href: string): HighlightSection[] {
  const expression = href.split(linesPrefix)[1];

  /* Split blocks to ['1', '3-4', '5']. */
  const blocks = expression.split(',');
  return blocks.map((block) => {
    /* Parse start and end. */
    const [startRaw, endRaw] = block.split('-');
    const start = parseInt(startRaw, 10);

    /* If end is not defined, use start. */
    const end = endRaw ? parseInt(endRaw, 10) : start;
    return createHighlightSection({
      start,
      end,
    });
  });
}

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
    return href.startsWith(linesPrefix);
  }
}

@NgModule({
  declarations: [TextBlockLinkComponent],
  exports: [TextBlockLinkComponent],
  imports: [CommonModule],
})
export class TextBlockLinkModule {}
