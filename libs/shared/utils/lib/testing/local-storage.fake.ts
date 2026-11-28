import { Injectable, Provider } from '@angular/core';
import { LocalStorage } from '../local-storage.service';

export function provideLocalStorageFake(): Provider[] {
  return [
    LocalStorageFake,
    { provide: LocalStorage, useExisting: LocalStorageFake },
  ];
}

@Injectable()
export class LocalStorageFake implements LocalStorage {
  private _items = new Map<string, string>();

  getItem(key: string) {
    return this._items.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this._items.set(key, value);
  }

  removeItem(key: string) {
    this._items.delete(key);
  }
}
