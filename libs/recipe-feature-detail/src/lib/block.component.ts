import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { TextBlockModule } from './text-block.component';
import { Block, BlockType } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-block',
  template: ` <ng-container [ngSwitch]="block.type">
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
  imports: [CommonModule, TextBlockModule],
})
export class BlockModule {}
