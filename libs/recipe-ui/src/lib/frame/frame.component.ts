import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { BlockModule } from '../block/block.component';
import { Frame } from '../../../../recipe-core/src/lib/frame';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-frame',
  template: `
    <div fxLayout="column" fxLayout.gt-sm="row">
      <mc-block
        *ngFor="let block of frame.blocks"
        [block]="block"
        fxFlex
        ngClass.gt-sm="block"
      ></mc-block>
    </div>
  `,
  styles: [
    `
      .block {
        overflow-x: auto;
      }
    `,
  ],
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
