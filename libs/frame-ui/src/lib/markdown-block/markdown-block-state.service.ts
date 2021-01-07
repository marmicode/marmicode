import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { pluck } from 'rxjs/operators';
import { HighlightZone } from '../highlight/highlight-zone';

export interface MarkdownBlockState {
  highlightableZones: HighlightZone[];
}

/**
 * State service making communication between markdown components easier.
 * It is locally provided by `<mc-markdown-block>`
 */
@Injectable()
export class MarkdownBlockStateService extends RxState<MarkdownBlockState> {
  highlightableZones$ = this.select(pluck('highlightableZones'));
}
