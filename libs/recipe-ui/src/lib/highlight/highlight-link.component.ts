import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createHighlightZone, HighlightZone } from './highlight-zone';
import { isHighlightLink, parseHighlightLink } from './parse-highlight-link';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-highlight-link',
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
export class HighlightLinkComponent implements OnChanges {
  @Input() color: string;
  @Input() href: string;

  /* Add `data-role=highlight-link` attribute for testing. */
  @HostBinding('attr.data-role') dataRole = 'highlight-link';

  private _clicked = false;
  private _zone: HighlightZone;

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

  constructor(private _elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.href) {
      this._zone = createHighlightZone({
        color: this.color,
        sections: parseHighlightLink(this.href),
      });
    }
  }

  /**
   * Apply color property to element's style.
   */
  @HostBinding('style.color') get styleColor() {
    return this.color;
  }

  @HostListener('click') onClick() {
    this._clicked = true;
    this._highlight();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    /* Reset clicked state on mouse enter. */
    this._clicked = false;
    this._highlight();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    /* Cancel only if not clicked. */
    if (!this._clicked) {
      this._cancelHighlight();
    }
  }

  private _highlight() {
    this._dispatchHighlightZoneChange(this._zone);
  }

  private _cancelHighlight() {
    this._dispatchHighlightZoneChange(null);
  }

  private _dispatchHighlightZoneChange(zone: HighlightZone | null) {
    this._elementRef.nativeElement.dispatchEvent(
      new CustomEvent('highlightZoneChange', {
        bubbles: true,
        detail: zone,
      })
    );
  }
}

@NgModule({
  declarations: [HighlightLinkComponent],
  exports: [HighlightLinkComponent],
  imports: [CommonModule],
})
export class HighlightLinkModule {
  constructor(injector: Injector) {
    customElements.define(
      'mc-highlight-link',
      createCustomElement(HighlightLinkComponent, {
        injector,
      })
    );
  }
}