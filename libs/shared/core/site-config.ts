import { Injectable } from '@angular/core';

@Injectable()
export abstract class SiteConfig {
  /**
   * The origin of the site.
   * This can't be dynamic due to SSG.
   * When set to `null` (mainly for local development), the origin will
   * be computed from the `PlatformLocation` service.
   */
  abstract readonly origin: string | null;
}
