import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {
  BlockGroup,
  BlockType,
  createMarkdownBlock,
  parseMarkdown,
} from '@marmicode/block-core';
import { RxState } from '@rx-angular/state';
import { select } from '@rx-angular/state/selections';
import { map } from 'rxjs/operators';
import { BlockComponent } from '../block.component';
import { extractHighlightableZones } from '../highlight/extract-highlightable-zones';
import { HighlightZone } from '../highlight/highlight-zone';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-block-group',
  template: `
    @for (block of blocks$ | async; track block) {
      <mc-block
        [block]="block"
        [highlightableZones]="highlightableZones$ | async"
        [highlightZone]="highlightZone$ | async"
        (highlightZoneChange)="onHighlightZone($event)"
        [class.is-row]="desktopLayout === 'row'"
        class="block"
      ></mc-block>
    }
  `,
  styles: [
    `
      /* Make sure blocks respect the flex allowed space.
       * Cf. block-ui-e2e > frame.spec.ts > should apply horizontal scroll if code overflows
       * We shouldn't apply it on column display otherwise the height would be 0. */
      @media screen and (min-width: 960px) {
        .block.is-row {
          overflow-x: auto;
        }
      }

      /* @hack don't use fxFlex as it overrides parent elements flex style. */
      .block {
        flex: 1 1 0;
      }
    `,
  ],
  providers: [RxState],
  imports: [BlockComponent, AsyncPipe],
})
export class BlockGroupComponent {
  @Input() set blockGroup(blockGroup: BlockGroup) {
    this._state.set({ blockGroup });
  }
  /* Controls desktop layout. (e.g. blog posts use column layout on desktop).
   * Mobile is always column. */
  @Input() desktopLayout: 'column' | 'row' = 'row';

  /* @hack this is always true but it's the ng-way of setting the class on host. */
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
            : block,
        ),
      ),
    ),
  );
  highlightZone$ = this._state.select('highlightZone');
  highlightableZones$ = this.blocks$.pipe(
    select(map((blocks) => extractHighlightableZones(blocks))),
  );

  constructor(
    private _state: RxState<{
      blockGroup: BlockGroup;
      highlightZone: HighlightZone | null;
    }>,
  ) {
    /* Reset highlight zone when blocks change. */
    this._state.connect(
      this.blocks$.pipe(
        map(() => ({ highlightZone: null as HighlightZone | null })),
      ),
    );
  }

  onHighlightZone(highlightZone: HighlightZone) {
    this._state.set({ highlightZone });
  }
}
