/**
 *
 * (c) 2013-2019 Wishtack
 *
 */

import { concat, Observable, of, OperatorFunction } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

export type ProgressifyEventType = 'complete' | 'error' | 'next' | 'started';

export interface ProgressifyEvent<T> {
  type: ProgressifyEventType;
  value?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function deprogressifyData<T>(): OperatorFunction<
  ProgressifyEvent<T>,
  T
> {
  return function deprogressifyDataOperator(
    source: Observable<ProgressifyEvent<T>>
  ): Observable<T> {
    return source.pipe(
      filter((notification) => notification.type === 'next'),
      map((notification) => notification.value as T)
    );
  };
}
