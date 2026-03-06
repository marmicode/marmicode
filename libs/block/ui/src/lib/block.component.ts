import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import {
  Block,
  BlockType,
  CodeBlock,
  MarkdownBlock,
} from '@marmicode/block/core';
import {
  CodeBlockModule,
  CodeBlockComponent,
} from './code-block/code-block.component';
import { HighlightZone } from './highlight/highlight-zone';
import {
  MarkdownBlockModule,
  MarkdownBlockComponent,
} from './markdown-block/markdown-block.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-block',
  template: `
@switch (block.type) {
  <!-- Code. -->
  @case (BlockType.Code) {
    <mc-code-block
      [block]="codeBlock"
      [highlightableZones]="highlightableZones"
      [highlightZone]="highlightZone"
    ></mc-code-block>
  }
  <!-- Markdown. -->
  @case (BlockType.Markdown) {
    <mc-markdown-block
      [block]="markdownBlock"
      [highlightableZones]="highlightableZones"
      (highlightZoneChange)="highlightZoneChange.emit($event)"
    ></mc-markdown-block>
  }
}
`,
  imports: [CodeBlockComponent, MarkdownBlockComponent],
})
export class BlockComponent {
  @Input() block!: Block;
  @Input() highlightZone!: HighlightZone;
  @Input() highlightableZones!: HighlightZone[];
  @Output() highlightZoneChange = new EventEmitter<HighlightZone>();

  BlockType = BlockType;

  get codeBlock() {
    return this.block as CodeBlock;
  }

  get markdownBlock() {
    return this.block as MarkdownBlock;
  }
}

@NgModule({
  exports: [BlockComponent],
  imports: [CommonModule, CodeBlockModule, MarkdownBlockModule, BlockComponent],
})
export class BlockModule {}
