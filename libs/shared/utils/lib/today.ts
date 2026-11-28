import { InjectionToken } from '@angular/core';

/**
 * Current date; overridden in tests.
 */
export const TODAY = new InjectionToken<() => Date>('TODAY', {
  factory: () => () => new Date(),
});
