import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from '../testing/get-test-scheduler';
import { progressify, ProgressifyEventType } from './progressify';

describe('progressify', () => {
  let scheduler: TestScheduler;

  beforeEach(() => (scheduler = getTestScheduler()));

  it('should add progress info on complete', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('--a-b-c-|');
      const expected = '    x-a-b-c-(y|)';

      expectObservable(source$.pipe(progressify())).toBe(expected, {
        x: {
          type: ProgressifyEventType.Started,
        },
        a: {
          type: ProgressifyEventType.Next,
          value: 'a',
        },
        b: {
          type: ProgressifyEventType.Next,
          value: 'b',
        },
        c: {
          type: ProgressifyEventType.Next,
          value: 'c',
        },
        y: {
          type: ProgressifyEventType.Complete,
        },
      });
    });
  });

  it('should add progress info on error', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('--a-#');
      const expected = '    x-a-(b|)';

      expectObservable(source$.pipe(progressify())).toBe(expected, {
        x: {
          type: ProgressifyEventType.Started,
        },
        a: {
          type: ProgressifyEventType.Next,
          value: 'a',
        },
        b: {
          type: ProgressifyEventType.Error,
          error: 'error',
        },
      });
    });
  });
});
