import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

export type MaterializedNotificationType = 'complete' | 'error' | 'next';

export interface MaterializedNotification<T> {
  type: MaterializedNotificationType;
  value?: T;
  error?: unknown;
}

/**
 * Catches errors and converts observable to an observable that emits {data: T} or {error: ...}.
 * We are not using `materialize` because we don't want to materialize `complete` notification.
 * Cf. spec.
 */
export function materializeError<T>(): OperatorFunction<
  T,
  MaterializedNotification<T>
> {
  return function materializeErrorOperation(
    source: Observable<T>
  ): Observable<MaterializedNotification<T>> {
    return source.pipe(
      map((value) => ({ type: 'next', value } as MaterializedNotification<T>)),
      catchError((error) =>
        of({ type: 'error', error } as MaterializedNotification<T>)
      )
    );
  };
}

/**
 * Filters errors and dematerializes data only.
 */
export function dematerializeData<T>(): OperatorFunction<
  MaterializedNotification<T>,
  T
> {
  return function dematerializeDataOperator(
    source: Observable<MaterializedNotification<T>>
  ): Observable<T> {
    return source.pipe(
      filter((notification) => notification.type === 'next'),
      map((notification) => notification.value as T)
    );
  };
}

export function dematerializeError<T>(): OperatorFunction<
  MaterializedNotification<T>,
  unknown
> {
  return function dematerializeErrorOperator(
    source: Observable<MaterializedNotification<T>>
  ): Observable<unknown> {
    return source.pipe(
      filter((notification) => notification.type === 'error'),
      map((notification) => notification.error)
    );
  };
}
