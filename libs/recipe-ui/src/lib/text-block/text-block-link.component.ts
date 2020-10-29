import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { extractHighlightableZones } from '../highlight/extract-highlightable-zones';
import { HighlightZone } from '../highlight/highlight-info';
import {
  isHighlightLink,
  parseHighlightLink,
} from '../highlight/parse-highlight-link';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-text-block-link',
  template: `{{ color }}<ng-content></ng-content>`,
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
  @Input() color: string;
  @Input() href: string;

  static canHandleLink(href: string) {
    return isHighlightLink(href);
  }

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
