import { MonoTypeOperatorFunction } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export function shareReplayWithRefCount<T>(): MonoTypeOperatorFunction<T> {
  return shareReplay<T>({bufferSize: 1, refCount: true});
}
