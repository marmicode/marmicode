import { LocalStorage } from './local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WipService {
  constructor(private _localStorage: LocalStorage) {}

  isWip() {
    return this._localStorage.getItem('wip') === 'true';
  }
}
