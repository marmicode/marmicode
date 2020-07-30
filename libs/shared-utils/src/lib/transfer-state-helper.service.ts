import { Injectable } from '@angular/core';
import { concat, EMPTY, MonoTypeOperatorFunction } from 'rxjs';
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
      return concat(
        /* Check if value is present in the state. */
        this._transferState.hasKey(key)
          ? this._transferState
              .get<T>(key)
              .pipe(filter((value) => value != null))
          : EMPTY,
        source$.pipe(tap((value) => this._transferState.set<T>(key, value)))
      );
    };
  }
}
