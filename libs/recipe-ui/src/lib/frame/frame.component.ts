import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Frame } from '@marmicode/recipe-core';
import { RxState, select } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { BlockModule } from '../block.component';
import { extractHighlightableZones } from '../highlight/extract-highlightable-zones';
import { HighlightEventDetail } from '../highlight/highlight-event-detail';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-frame',
  providers: [RxState],
  template: `
    <mc-block
      *ngFor="let block of (frame$ | async).blocks"
      [block]="block"
      [highlightableZones]="highlightableZones$ | async"
      (highlightChange)="onHighlight($event.detail)"
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
  @Input() set frame(frame: Frame) {
    this._state.set({ frame });
  }

  frame$ = this._state.select('frame');
  highlightableZones$ = this.frame$.pipe(
    select(map((frame) => extractHighlightableZones(frame)))
  );

  constructor(private _state: RxState<{ frame: Frame }>) {}

  onHighlight({ zone }: HighlightEventDetail) {
    console.log('🚧 work in progress!');
  }
}

@NgModule({
  declarations: [FrameComponent],
  exports: [FrameComponent],
  imports: [CommonModule, FlexLayoutModule, BlockModule],
})
export class FrameModule {}
