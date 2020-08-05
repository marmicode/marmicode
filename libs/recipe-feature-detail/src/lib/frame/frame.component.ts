import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { BlockModule } from '../block/block.component';
import { Frame } from './frame';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-frame',
  template: `
    <div fxLayout="column" fxLayout.gt-sm="row">
      <mc-recipe-block
        *ngFor="let block of frame.blocks"
        [block]="block"
        fxFlex
      ></mc-recipe-block>
    </div>
  `,
})
export class FrameComponent {
  @Input() frame: Frame;
}

@NgModule({
  declarations: [FrameComponent],
  exports: [FrameComponent],
  imports: [CommonModule, FlexModule, BlockModule],
})
export class FrameModule {}
