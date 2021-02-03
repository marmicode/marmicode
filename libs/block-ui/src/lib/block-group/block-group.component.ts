import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgModule,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  BlockGroup,
  BlockType,
  createBlockGroup,
  createMarkdownBlock,
  parseMarkdown,
} from '@marmicode/block-core';
import { RxState, select } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { BlockModule } from '../block.component';
import { extractHighlightableZones } from '../highlight/extract-highlightable-zones';
import { HighlightZone } from '../highlight/highlight-zone';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-block-group',
  template: `
    <mc-block
      *ngFor="let block of blocks$ | async"
      [block]="block"
      [highlightableZones]="highlightableZones$ | async"
      [highlightZone]="highlightZone$ | async"
      (highlightZoneChange)="onHighlightZone($event)"
      class="block"
    ></mc-block>
  `,
  styles: [
    `
      /* @hack don't use fxFlex as it overrides parent elements flex style. */
      .block {
        flex: 1 1 0;
        /* Make sure blocks respect the flex allowed space. 
         * Cf. block-ui-e2e > frame.spec.ts > should apply horizontal scroll if code overflows */
        overflow-x: auto;
      }
    `,
  ],
  providers: [RxState],
})
export class BlockGroupComponent {
  @Input() set blockGroup(blockGroup: BlockGroup) {
    this._state.set({ blockGroup });
  }
  /* Controls desktop layout. (e.g. blog posts use column layout on desktop).
   * Mobile is always column. */
  @Input() desktopLayout: 'column' | 'row' = 'row';

  @HostBinding('class.mc-flex-column') flexColumn = true;
  @HostBinding('class.mc-flex-row-gt-sm') get flexDesktopRow() {
    return this.desktopLayout === 'row';
  }

  /* Convert text blocks to markdown blocks. */
  blocks$ = this._state.select('blockGroup', 'blocks').pipe(
    select(
      map((blocks) =>
        blocks.map((block) =>
          block.type === BlockType.Text
            ? createMarkdownBlock({
                tokens: parseMarkdown(block.text),
              })
            : block
        )
      )
    )
  );
  highlightZone$ = this._state.select('highlightZone');
  highlightableZones$ = this.blocks$.pipe(
    select(map((blocks) => extractHighlightableZones(blocks)))
  );

  constructor(
    private _state: RxState<{
      blockGroup: BlockGroup;
      highlightZone: HighlightZone;
    }>
  ) {
    /* Reset highlight zone when blocks change. */
    this._state.connect(
      this.blocks$.pipe(map(() => ({ highlightZone: null })))
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
