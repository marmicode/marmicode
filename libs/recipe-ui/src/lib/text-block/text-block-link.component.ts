import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgModule,
} from '@angular/core';
import { HighlightZone } from '../highlight/highlight-info';
import {
  isHighlightLink,
  parseHighlightLink,
} from '../highlight/parse-highlight-link';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-text-block-link',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        cursor: pointer;
        border-bottom: 1px dashed currentColor;
      }
    `,
  ],
})
export class TextBlockLinkComponent {
  @Input() color: string;
  @Input() href: string;

  @HostBinding('style.color') get styleColor() {
    return this.color;
  }

  static canHandleLink(href: string) {
    return isHighlightLink(href);
  }

  /**
   * This is a hacky function that builds the color attribute
   * that our custom element will receive.
   * This hack is the best solution compared to:
   * - passing highlightableZones as a serialized attribute
   * - sharing highlightableZones in state management as we would have
   * to load highlightableZones for all blocks as multiple blocks can
   * appear on the same page + we don't want our custom elements to
   * depend on such state.
   */
  static buildAttributes({
    highlightableZones,
    href,
  }: {
    highlightableZones: HighlightZone[];
    href: string;
  }) {
    const highlightSections = parseHighlightLink(href);
    const zone = highlightableZones.find(
      (_zone) =>
        JSON.stringify(_zone.sections) === JSON.stringify(highlightSections)
    );
    if (zone != null) {
      return `color="${zone.color}"`;
    }
  }
}

@NgModule({
  declarations: [TextBlockLinkComponent],
  exports: [TextBlockLinkComponent],
  imports: [CommonModule],
})
export class TextBlockLinkModule {}
