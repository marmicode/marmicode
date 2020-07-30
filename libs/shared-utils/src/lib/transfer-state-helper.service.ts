import { Injectable } from '@angular/core';
import { concat, Observable } from 'rxjs';
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
  decorate<T>({
    key,
    source,
  }: {
    key: string;
    source: Observable<T>;
  }): Observable<T> {
    return concat([
      /* Check if value is present in the state. */
      this._transferState.get(key).pipe(filter((value) => value != null)),
      source.pipe(tap((value) => this._transferState.set(key, value))),
    ]);
  }
}
