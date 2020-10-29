import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Block, BlockType } from '@marmicode/recipe-core';
import { CodeBlockModule } from './code-block/code-block.component';
import { TextBlockModule } from './text-block/text-block.component';

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
  @Input() block: Block;

  BlockType = BlockType;
}

@NgModule({
  declarations: [BlockComponent],
  exports: [BlockComponent],
  imports: [CommonModule, TextBlockModule, CodeBlockModule],
})
export class BlockModule {}
