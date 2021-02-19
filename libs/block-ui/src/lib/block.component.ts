import { CommonModule } from '@angular/common';
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
} from '@marmicode/block-core';
import { CodeBlockModule } from './code-block/code-block.component';
import { HighlightZone } from './highlight/highlight-zone';
import { MarkdownBlockModule } from './markdown-block/markdown-block.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-block',
  template: ` <ng-container [ngSwitch]="block.type">
    <!-- Code. -->
    <mc-code-block
      *ngSwitchCase="BlockType.Code"
      [block]="codeBlock"
      [highlightableZones]="highlightableZones"
      [highlightZone]="highlightZone"
    ></mc-code-block>

    <!-- Markdown. -->
    <mc-markdown-block
      *ngSwitchCase="BlockType.Markdown"
      [block]="markdownBlock"
      [highlightableZones]="highlightableZones"
      (highlightZoneChange)="highlightZoneChange.emit($event)"
    ></mc-markdown-block>
  </ng-container>`,
})
export class BlockComponent {
  @Input() block: Block;
  @Input() highlightZone: HighlightZone;
  @Input() highlightableZones: HighlightZone[];
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
  declarations: [BlockComponent],
  exports: [BlockComponent],
  imports: [CommonModule, CodeBlockModule, MarkdownBlockModule],
})
export class BlockModule {}
