import { Observable, PartialObserver, Subscription } from 'rxjs';
import { beforeEach, afterEach, jest } from '@jest/globals';

export function createObserver() {
  let subscription: Subscription;

  beforeEach(() => (subscription = new Subscription()));
  afterEach(() => subscription.unsubscribe());

  return {
    observe<T>(observable: Observable<T>) {
      const observer: PartialObserver<T> = {
        next: jest.fn<(value: T) => void>(),
        error: jest.fn<(error: unknown) => void>(),
        complete: jest.fn<() => void>(),
      };
      subscription.add(observable.subscribe(observer));
      return observer;
    },
  };
}
