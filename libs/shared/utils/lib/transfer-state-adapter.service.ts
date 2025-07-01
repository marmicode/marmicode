import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Platform } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class TransferStateAdapter {
  constructor(
    private _platform: Platform,
    private _transferState: TransferState
  ) {}

  get<T>(key: string): Observable<T> {
    return of(this._transferState.get<T>(makeStateKey(key), null));
  }

  hasKey<T>(key: string) {
    return this._transferState.hasKey<T>(makeStateKey<T>(key));
  }

  set<T>(key: string, value: T) {
    this._transferState.set(makeStateKey<T>(key), value);
  }

  isPrerendering() {
    return this._platform.isServer();
  }
}
