import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

export interface DematerializedNotification<T> {
  value?: T;
  error?: unknown;
  hasValue: boolean;
  isError: boolean;
}

/**
 * Catches errors and converts observable to an observable that emits {data: T} or {error: ...}.
 * We are not using `materialize` because we don't want to materialize `complete` notification.
 * Cf. spec.
 */
export function materializeError<T>(): OperatorFunction<
  T,
  DematerializedNotification<T>
> {
  return function materializeErrorOperation(
    source: Observable<T>
  ): Observable<DematerializedNotification<T>> {
    return source.pipe(
      map(value => ({ value, hasValue: true, isError: false })),
      catchError(error => of({ error, hasValue: false, isError: true }))
    );
  };
}

/**
 * Filters errors and dematerializes data only.
 */
export function dematerializeData<T>(): OperatorFunction<
  DematerializedNotification<T>,
  T
> {
  return function dematerializeErrorOperation(
    source: Observable<DematerializedNotification<T>>
  ): Observable<T> {
    return source.pipe(
      filter(notification => notification.hasValue),
      map(notification => notification.value)
    );
  };
}

export function dematerializeError<T>(): OperatorFunction<
  DematerializedNotification<T>,
  unknown
> {
  return function dematerializeErrorOperation(
    source: Observable<DematerializedNotification<T>>
  ): Observable<unknown> {
    return source.pipe(
      filter(notification => notification.isError),
      map(notification => notification.error)
    );
  };
}
