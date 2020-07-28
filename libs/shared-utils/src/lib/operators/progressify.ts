/**
 *
 * (c) 2013-2019 Wishtack
 *
 */

import { concat, of, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export enum ProgressifyEventType {
  Complete = 'complete',
  Error = 'error',
  Next = 'next',
  Started = 'started',
}

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
        type: ProgressifyEventType.Started,
      }),
      source$.pipe(
        map((value) => ({
          type: ProgressifyEventType.Next,
          value,
        }))
      ),
      ...(ignoreComplete
        ? []
        : [
            of({
              type: ProgressifyEventType.Complete,
            }),
          ])
    ).pipe(
      catchError((error) =>
        of({
          type: ProgressifyEventType.Error,
          error,
        })
      )
    );
};
