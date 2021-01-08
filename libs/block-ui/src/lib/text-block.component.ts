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
import {
  createMarkdownBlock,
  MarkdownBlock,
  parseMarkdown,
  TextBlock,
} from '@marmicode/block-core';
import { HighlightLinkModule } from './highlight/highlight-link.component';
import { HighlightZone } from './highlight/highlight-zone';
import { MarkdownBlockModule } from './markdown-block/markdown-block.component';

/**
 * This component acts as a proxy that converts markdown text
 * to markdown components which are forwared to <mc-markdown-block>
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'mc-text-block',
  template: `
    <mc-markdown-block
      [block]="markdownBlock"
      [highlightableZones]="highlightableZones"
      (highlightZoneChange)="highlightZoneChange.emit($event)"
    ></mc-markdown-block>
  `,
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
        tokens: parseMarkdown(this.block.text),
      });
    }
  }
}

@NgModule({
  declarations: [TextBlockComponent],
  exports: [TextBlockComponent],
  imports: [CommonModule, HighlightLinkModule, MarkdownBlockModule],
})
export class TextBlockModule {}
