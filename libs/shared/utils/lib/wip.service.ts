import { LocalStorage } from './local-storage.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WipService {
  private _localStorage = inject(LocalStorage);


  isWip() {
    return this._localStorage.getItem('wip') === 'true';
  }
}
