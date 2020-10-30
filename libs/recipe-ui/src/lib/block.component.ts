import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { Block, BlockType } from '@marmicode/recipe-core';
import { CodeBlockModule } from './code-block/code-block.component';
import { HighlightZone } from './highlight/highlight-zone';
import { TextBlockModule } from './text-block/text-block.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-block',
  template: ` <ng-container [ngSwitch]="block.type">
    <mc-code-block
      *ngSwitchCase="BlockType.Code"
      [block]="block"
      [highlightableZones]="highlightableZones"
      [highlightZone]="highlightZone"
    ></mc-code-block>
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
  imports: [CommonModule, TextBlockModule, CodeBlockModule],
})
export class BlockModule {}
