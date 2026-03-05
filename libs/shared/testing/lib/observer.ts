/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, PartialObserver, Subscription } from 'rxjs';
import type { vi } from 'vitest';

export async function observe<T>(observable: Observable<T>) {
  const fn = await _getSpyFactory();
  const subscription = new Subscription();
  const observer: PartialObserver<T> = {
    next: fn<() => void>(),
    error: fn<(error: unknown) => void>(),
    complete: fn<() => void>(),
  };
  subscription.add(observable.subscribe(observer));
  return {
    ...observer,
    [Symbol.dispose]: () => {
      subscription.unsubscribe();
    },
  };
}

async function _getSpyFactory(): Promise<typeof vi.fn> {
  try {
    const { jest } = await import('@jest/globals');
    return jest.fn.bind(jest) as unknown as typeof vi.fn;
  } catch {
    const { vi } = await import('vitest');
    return vi.fn.bind(vi);
  }
}
