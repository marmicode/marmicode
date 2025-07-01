import { Injectable } from '@angular/core';
import { concat, MonoTypeOperatorFunction } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { TransferStateAdapter } from './transfer-state-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class TransferStateHelper {
  constructor(private _transferState: TransferStateAdapter) {}

  /**
   * Decorates the source in order to preload data from transfer state
   * and save it in state after loading it.
   */
  transfer<T>(key: string): MonoTypeOperatorFunction<T> {
    return (source$) => {
      /* Update state when prerendering. */
      if (this._transferState.isPrerendering()) {
        source$ = source$.pipe(
          tap((value) => this._transferState.set<T>(key, value))
        );
      }

      /* When running in browser and key is available in state. */
      if (
        !this._transferState.isPrerendering() &&
        this._transferState.hasKey(key)
      ) {
        source$ = concat(
          this._transferState
            .get<T>(key)
            .pipe(filter((value) => value != null)),
          source$
        );
      }

      return source$;
    };
  }
}
