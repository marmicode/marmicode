import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injector,
  Input,
  NgModule,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { TextBlock } from '@marmicode/recipe-core';
import { HighlightEventDetail } from '../highlight/highlight-event-detail';
import { HighlightZone } from '../highlight/highlight-info';
import { MarkdownPipeModule } from './markdown.pipe';
import { HighlightLinkComponent } from '../highlight/highlight-link.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-text-block',
  template: ` <div
    [innerHTML]="
      block.text | markdown: { highlightableZones: highlightableZones }
    "
    (highlightChange)="highlightChange.emit($event.detail)"
  ></div>`,
  styleUrls: ['./text-block.component.scss'],
})
export class TextBlockComponent {
  @Input() block: TextBlock;
  /**
   * The available zones to highlight.
   */
  @Input() highlightableZones: HighlightZone[];
  @Output() highlightChange = new EventEmitter<HighlightEventDetail>();
}

@NgModule({
  declarations: [TextBlockComponent],
  exports: [TextBlockComponent],
  imports: [CommonModule, MarkdownPipeModule],
})
export class TextBlockModule {
  constructor(injector: Injector) {
    customElements.define(
      'mc-text-block-link',
      createCustomElement(HighlightLinkComponent, {
        injector,
      })
    );
  }
}
