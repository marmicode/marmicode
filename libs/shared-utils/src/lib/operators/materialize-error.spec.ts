import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from '../testing/get-test-scheduler';
import {
  dematerializeData,
  MaterializedNotificationType,
  dematerializeError,
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
        a: { type: MaterializedNotificationType.Next, value: 'a' },
        b: { type: MaterializedNotificationType.Next, value: 'b' },
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
        a: { type: MaterializedNotificationType.Next, value: 'a' },
        e: { type: MaterializedNotificationType.Error, error: 'error' },
      });
    });
  });

  it('should dematerialize data', () => {
    scheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const data$ = cold('    --a-(e|)', {
        a: { type: MaterializedNotificationType.Next, value: 'a' },
        e: { type: MaterializedNotificationType.Error, error: 'error' },
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
        a: { type: MaterializedNotificationType.Next, value: 'a' },
        e: { type: MaterializedNotificationType.Error, error: 'error' },
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
