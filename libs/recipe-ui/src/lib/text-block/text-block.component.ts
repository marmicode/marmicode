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
import { HighlightInfo } from '../highlight/highlight-info';
import { MarkdownPipeModule } from './markdown.pipe';
import { TextBlockLinkComponent } from './text-block-link.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-text-block',
  template: ` <div
    [innerHTML]="
      block.text | markdown: { availableHighlight: availableHighlight }
    "
  ></div>`,
  styleUrls: ['./text-block.component.scss'],
})
export class TextBlockComponent {
  @Input() availableHighlight: HighlightInfo;
  @Input() block: TextBlock;
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
