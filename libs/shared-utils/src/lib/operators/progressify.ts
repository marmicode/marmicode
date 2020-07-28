/**
 *
 * (c) 2013-2019 Wishtack
 *
 */

import { concat, of, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export enum ProgressifyStatus {
  Complete = 'complete',
  Error = 'error',
  Next = 'next',
  Started = 'started'
}

export interface ProgressifyEvent<T> {
  status: ProgressifyStatus;
  value?: T;
  error?: any;
}

/**
 * Adds progress info to observable.
 * Works like `materialize` but triggers an additional event on subscription.
 */
export const progressify = <T>({
  ignoreComplete = false
}: {
  ignoreComplete?: boolean;
} = {}): OperatorFunction<T, ProgressifyEvent<T>> => {
  return source$ =>
    concat(
      of({
        status: ProgressifyStatus.Started
      }),
      source$.pipe(
        map(value => ({
          status: ProgressifyStatus.Next,
          value
        }))
      ),
      ...(ignoreComplete
        ? []
        : [
            of({
              status: ProgressifyStatus.Complete
            })
          ])
    ).pipe(
      catchError(error =>
        of({
          status: ProgressifyStatus.Error,
          error
        })
      )
    );
};
