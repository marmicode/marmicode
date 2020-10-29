import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { TextBlock } from '@marmicode/recipe-core';
import { HighlightZone } from '../highlight/highlight-info';
import { MarkdownPipeModule } from './markdown.pipe';
import { TextBlockLinkComponent } from './text-block-link.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-text-block',
  template: ` <div [innerHTML]="block.text | markdown"></div>`,
  styleUrls: ['./text-block.component.scss'],
})
export class TextBlockComponent {
  @Input() block: TextBlock;
  /**
   * The available zones to highlight.
   */
  @Input() highlightableZones: HighlightZone[];
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
      createCustomElement(TextBlockLinkComponent, {
        injector,
      })
    );
  }
}
