import { CanMatchFn } from '@angular/router';

/**
 * Matches only in WIP mode (`localStorage.wip === 'true'`).
 * Put the WIP route first, then the current route with the same path as the fallback.
 *
 * @deprecated 🚧 work in progress
 */
export const matchWip: CanMatchFn = () => {
  throw new Error('🚧 work in progress');
};
