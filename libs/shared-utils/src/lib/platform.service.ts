import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Platform {
  private _platformId = inject(PLATFORM_ID);

  isBrowser() {
    return isPlatformBrowser(this._platformId);
  }

  isServer() {
    return isPlatformServer(this._platformId);
  }
}
