import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlockGroup } from '@marmicode/frame-core';
import { RxState, select } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { BlockModule } from '../block.component';
import { extractHighlightableZones } from '../highlight/extract-highlightable-zones';
import { HighlightZone } from '../highlight/highlight-zone';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-block-group',
  providers: [RxState],
  template: `
    <mc-block
      *ngFor="let block of (blockGroup$ | async).blocks"
      [block]="block"
      [highlightableZones]="highlightableZones$ | async"
      [highlightZone]="highlightZone$ | async"
      (highlightZoneChange)="onHighlightZone($event)"
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
export class BlockGroupComponent {
  @Input() set blockGroup(blockGroup: BlockGroup) {
    this._state.set({ blockGroup });
  }

  blockGroup$ = this._state.select('blockGroup');
  highlightZone$ = this._state.select('highlightZone');
  highlightableZones$ = this.blockGroup$.pipe(
    select(map((blockGroup) => extractHighlightableZones(blockGroup)))
  );

  constructor(
    private _state: RxState<{
      blockGroup: BlockGroup;
      highlightZone: HighlightZone;
    }>
  ) {
    this._state.connect(
      this.blockGroup$.pipe(map(() => ({ highlightZone: null })))
    );
  }

  onHighlightZone(highlightZone: HighlightZone) {
    this._state.set({ highlightZone });
  }
}

@NgModule({
  declarations: [BlockGroupComponent],
  exports: [BlockGroupComponent],
  imports: [BlockModule, CommonModule, FlexLayoutModule],
})
export class BlockGroupModule {}
