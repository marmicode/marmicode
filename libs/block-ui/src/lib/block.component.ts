import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { Block, BlockType } from '@marmicode/block-core';
import { CodeBlockModule } from './code-block/code-block.component';
import { HighlightZone } from './highlight/highlight-zone';
import { MarkdownBlockModule } from './markdown-block/markdown-block.component';
import { TextBlockModule } from './text-block.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-block',
  template: ` <ng-container [ngSwitch]="block.type">
    <!-- Code. -->
    <mc-code-block
      *ngSwitchCase="BlockType.Code"
      [block]="block"
      [highlightableZones]="highlightableZones"
      [highlightZone]="highlightZone"
    ></mc-code-block>

    <!-- Markdown. -->
    <mc-markdown-block
      *ngSwitchCase="BlockType.Markdown"
      [block]="block"
      [highlightableZones]="highlightableZones"
      (highlightZoneChange)="highlightZoneChange.emit($event)"
    ></mc-markdown-block>

    <!-- Text (converts text to markdown tokens and uses <mc-markdown-block>). -->
    <mc-text-block
      *ngSwitchCase="BlockType.Text"
      [block]="block"
      [highlightableZones]="highlightableZones"
      (highlightZoneChange)="highlightZoneChange.emit($event)"
    ></mc-text-block>
  </ng-container>`,
})
export class BlockComponent {
  @Input() block: Block;
  @Input() highlightZone: HighlightZone;
  @Input() highlightableZones: HighlightZone[];
  @Output() highlightZoneChange = new EventEmitter<HighlightZone>();

  BlockType = BlockType;
}

@NgModule({
  declarations: [BlockComponent],
  exports: [BlockComponent],
  imports: [
    CommonModule,
    TextBlockModule,
    CodeBlockModule,
    MarkdownBlockModule,
  ],
})
export class BlockModule {}
