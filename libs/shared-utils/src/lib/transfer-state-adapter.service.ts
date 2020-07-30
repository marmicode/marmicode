import { Injectable } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransferStateAdapter {
  constructor(private _stateTransferService: TransferStateService) {}

  get<T>(key: string): Observable<T> {
    return this._stateTransferService.getState(key);
  }

  set<T>(key: string, value: T) {
    this._stateTransferService.setState(key, value);
  }
}
