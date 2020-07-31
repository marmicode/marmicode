import { Injectable } from '@angular/core';
import { isScullyRunning, TransferStateService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransferStateAdapter {
  constructor(private _transferStateService: TransferStateService) {}

  get<T>(key: string): Observable<T> {
    return (
      this._transferStateService
        .getState<T>(key)
        /* TransferStateService should not emit multiple values
         * but Scully doesn't seem to respect this rule. */
        .pipe(take(1))
    );
  }

  hasKey(key: string) {
    return this._transferStateService.stateHasKey(key);
  }

  set<T>(key: string, value: T) {
    this._transferStateService.setState(key, value);
  }

  isPrerendering() {
    return isScullyRunning();
  }
}
