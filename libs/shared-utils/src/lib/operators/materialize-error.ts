import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';

export enum DematerializedNotificationType {
  Complete = 'complete',
  Error = 'error',
  Next = 'next',
}

export interface DematerializedNotification<T> {
  type: DematerializedNotificationType;
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
  DematerializedNotification<T>
> {
  return function materializeErrorOperation(
    source: Observable<T>
  ): Observable<DematerializedNotification<T>> {
    return source.pipe(
      map((value) => ({ type: DematerializedNotificationType.Next, value })),
      catchError((error) =>
        of({ type: DematerializedNotificationType.Error, error })
      )
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
  return function dematerializeDataOperator(
    source: Observable<DematerializedNotification<T>>
  ): Observable<T> {
    return source.pipe(
      filter(
        (notification) =>
          notification.type === DematerializedNotificationType.Next
      ),
      map((notification) => notification.value)
    );
  };
}

export function dematerializeError<T>(): OperatorFunction<
  DematerializedNotification<T>,
  unknown
> {
  return function dematerializeErrorOperator(
    source: Observable<DematerializedNotification<T>>
  ): Observable<unknown> {
    return source.pipe(
      filter(
        (notification) =>
          notification.type === DematerializedNotificationType.Error
      ),
      map((notification) => notification.error)
    );
  };
}
