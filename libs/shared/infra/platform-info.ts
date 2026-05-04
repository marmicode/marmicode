import { PlatformLocation } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { SiteConfig } from '@marmicode/shared/core';

@Injectable({ providedIn: 'root' })
export class PlatformInfo {
  private _siteConfig = inject(SiteConfig);
  private _platformLocation = inject(PlatformLocation);

  /**
   * Returns the origin of the site.
   * If the origin is not set in the `SiteConfig`, the origin will be computed from the `PlatformLocation` service.
   * The reason for this is that the origin can't be dynamic due to SSG.
   */
  getOrigin(): string {
    const origin = this._siteConfig.origin;
    if (origin != null) {
      return origin;
    }
    const { protocol, hostname, port } = this._platformLocation;
    return `${protocol}//${hostname}:${port}`;
  }
}
