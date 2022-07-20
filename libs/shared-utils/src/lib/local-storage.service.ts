import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  getItem(key: string) {
    return globalThis.localStorage?.getItem(key);
  }
}
