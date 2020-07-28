/**
 *
 * (c) 2013-2019 Wishtack
 *
 */

import { concat, of, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type ProgressifyEventType = 'complete' | 'error' | 'next' | 'started';

export interface ProgressifyEvent<T> {
  type: ProgressifyEventType;
  value?: T;
  error?: any;
}

/**
 * Adds progress info to observable.
 * Works like `materialize` but triggers an additional event on subscription.
 */
export const progressify = <T>({
  ignoreComplete = false,
}: {
  ignoreComplete?: boolean;
} = {}): OperatorFunction<T, ProgressifyEvent<T>> => {
  return (source$) =>
    concat(
      of({
        type: 'started',
      } as ProgressifyEvent<T>),
      source$.pipe(
        map(
          (value) =>
            ({
              type: 'next',
              value,
            } as ProgressifyEvent<T>)
        )
      ),
      ...(ignoreComplete
        ? []
        : [
            of({
              type: 'complete',
            } as ProgressifyEvent<T>),
          ])
    ).pipe(
      catchError((error) =>
        of({
          type: 'error',
          error,
        } as ProgressifyEvent<T>)
      )
    );
};
