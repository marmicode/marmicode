import { beforeEach, describe, it } from '@jest/globals';
import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from '../testing/get-test-scheduler';
import {
  dematerializeData,
  dematerializeError,
  MaterializedNotification,
  materializeError,
} from './materialize-error';

describe('materializeError', () => {
  let scheduler: TestScheduler;

  beforeEach(() => (scheduler = getTestScheduler()));

  it('should materialize data', () => {
    scheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const data$ = cold('    --a-b-|');
      const expectedSub = '   ^-----!';
      const expectedObs = '   --a-b-|';

      const result$ = data$.pipe(materializeError());

      expectSubscriptions(data$.subscriptions).toBe(expectedSub);
      expectObservable(result$).toBe(expectedObs, {
        a: { type: 'next', value: 'a' } as MaterializedNotification<string>,
        b: { type: 'next', value: 'b' } as MaterializedNotification<string>,
      });
    });
  });

  it('should materialize error', () => {
    scheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const data$ = cold('    --a-#');
      const expectedSub = '   ^---!';
      const expectedObs = '   --a-(e|)';

      const result$ = data$.pipe(materializeError());

      expectSubscriptions(data$.subscriptions).toBe(expectedSub);
      expectObservable(result$).toBe(expectedObs, {
        a: { type: 'next', value: 'a' } as MaterializedNotification<string>,
        e: {
          type: 'error',
          error: 'error',
        } as MaterializedNotification<string>,
      });
    });
  });

  it('should dematerialize data', () => {
    scheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const data$ = cold('    --a-(e|)', {
        a: { type: 'next', value: 'a' } as MaterializedNotification<string>,
        e: {
          type: 'error',
          error: 'error',
        } as MaterializedNotification<string>,
      });
      const expectedSub = '   ^---!';
      const expectedObs = '   --a-|';

      const result$ = data$.pipe(dematerializeData());

      expectSubscriptions(data$.subscriptions).toBe(expectedSub);
      expectObservable(result$).toBe(expectedObs);
    });
  });

  it('should dematerialize error', () => {
    scheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const data$ = cold('    --a-(e|)', {
        a: { type: 'next', value: 'a' } as MaterializedNotification<string>,
        e: {
          type: 'error',
          error: 'error',
        } as MaterializedNotification<string>,
      });
      const expectedSub = '   ^---!';
      const expectedObs = '   ----(e|)';

      const result$ = data$.pipe(dematerializeError());

      expectSubscriptions(data$.subscriptions).toBe(expectedSub);
      expectObservable(result$).toBe(expectedObs, {
        e: 'error',
      });
    });
  });
});
