import { InjectionToken } from '@angular/core';

/**
 * Current date; overridden in tests.
 *
 * @deprecated 🚧 work in progress
 */
export const TODAY = new InjectionToken<() => Date>('TODAY', {
  factory: () => () => {
    throw new Error('🚧 work in progress');
  },
});
