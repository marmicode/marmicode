import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Block, BlockType } from '../../../../recipe-core/src/lib/block';
import { CodeBlockModule } from './code-block.component';
import { TextBlockModule } from './text-block.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-block',
  template: ` <ng-container [ngSwitch]="block.type">
    <mc-code-block
      *ngSwitchCase="BlockType.Code"
      [block]="block"
    ></mc-code-block>
    <mc-text-block
      *ngSwitchCase="BlockType.Text"
      [block]="block"
    ></mc-text-block>
  </ng-container>`,
})
export class BlockComponent {
  BlockType = BlockType;

  @Input() block: Block;
}

@NgModule({
  declarations: [BlockComponent],
  exports: [BlockComponent],
  imports: [CommonModule, TextBlockModule, CodeBlockModule],
})
export class BlockModule {}
