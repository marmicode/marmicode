import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Block, BlockType } from './block';
import { CodeBlockModule } from './code-block.component';
import { TextBlockModule } from './text-block.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-block',
  template: ` <ng-container [ngSwitch]="block.type">
    <mc-code-block *ngSwitchCase="BlockType.Code"></mc-code-block>
    <mc-text-block *ngSwitchCase="BlockType.Text"></mc-text-block>
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
