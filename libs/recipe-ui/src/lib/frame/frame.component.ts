import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlockModule } from '../block/block.component';
import { Frame } from '@marmicode/recipe-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-frame',
  template: `
    <mc-block
      *ngFor="let block of frame.blocks"
      [block]="block"
      class="block"
    ></mc-block>
  `,
  styles: [
    `
      /* This is more reliable than fxLayout="column" fxLayout.gt-sm="row"
       * as it doesn't rely on JavaScript which makes it work on Storybook + Percy. */
      :host {
        display: flex;
        flex-direction: column;
      }

      @media (min-width: 960px) {
        :host {
          flex-direction: row;
        }

        .block {
          overflow-x: auto;
        }
      }

      /* @hack don't use fxFlex as it overrides parent elements flex style. */
      .block {
        flex: 1 1 0;
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
  imports: [CommonModule, FlexLayoutModule, BlockModule],
})
export class FrameModule {}
