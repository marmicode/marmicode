import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { TextBlock } from '@marmicode/frame-core';
import { WipModule } from '@marmicode/shared-utils';
import * as marked from 'marked';
import { createMarkdownBlock, MarkdownBlock } from '@marmicode/frame-core';
import {
  HighlightLinkComponent,
  HighlightLinkModule,
} from '../highlight/highlight-link.component';
import { HighlightZone } from '../highlight/highlight-zone';
import { MarkdownBlockModule } from '../markdown-block/markdown-block.component';
import { MarkdownPipeModule } from './markdown.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-text-block',
  template: `
    <div
      *mcNotWip
      [innerHTML]="
        block.text | markdown: { highlightableZones: highlightableZones }
      "
      (highlightZoneChange)="onHighlightZoneChange($event)"
    ></div>
    <mc-markdown-block
      *mcWip
      [block]="markdownBlock"
      [highlightableZones]="highlightableZones"
    ></mc-markdown-block>
  `,
  styleUrls: ['./text-block.component.scss'],
})
export class TextBlockComponent implements OnChanges {
  @Input() block: TextBlock;
  /**
   * The available zones to highlight.
   */
  @Input() highlightableZones: HighlightZone[];
  @Output() highlightZoneChange = new EventEmitter<HighlightZone>();

  markdownBlock: MarkdownBlock;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.block) {
      this.markdownBlock = createMarkdownBlock({
        tokens: marked.lexer(this.block.text),
      });
    }
  }

  /**
   * Convert custom event to Angular output.
   */
  onHighlightZoneChange($event: CustomEvent<HighlightZone>) {
    $event.stopImmediatePropagation();
    this.highlightZoneChange.emit($event.detail);
  }
}

@NgModule({
  declarations: [TextBlockComponent],
  exports: [TextBlockComponent],
  imports: [
    CommonModule,
    HighlightLinkModule,
    MarkdownPipeModule,
    MarkdownBlockModule,
    WipModule,
  ],
})
export class TextBlockModule {}
