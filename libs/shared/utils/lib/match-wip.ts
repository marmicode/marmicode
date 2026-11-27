import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { WipService } from './wip.service';

/**
 * Matches only in WIP mode (`localStorage.wip === 'true'`).
 * Put the WIP route first, then the current route with the same path as the fallback.
 */
export const matchWip: CanMatchFn = () => inject(WipService).isWip();
