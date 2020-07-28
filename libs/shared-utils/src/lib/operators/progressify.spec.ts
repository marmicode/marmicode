import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from '../testing/get-test-scheduler';
import { progressify, ProgressifyStatus } from './progressify';

describe('progressify', () => {
  let scheduler: TestScheduler;

  beforeEach(() => (scheduler = getTestScheduler()));

  it('should add progress info on complete', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('--a-b-c-|');
      const expected = '    x-a-b-c-(y|)';

      expectObservable(source$.pipe(progressify())).toBe(expected, {
        x: {
          status: ProgressifyStatus.Started,
        },
        a: {
          status: ProgressifyStatus.Next,
          value: 'a',
        },
        b: {
          status: ProgressifyStatus.Next,
          value: 'b',
        },
        c: {
          status: ProgressifyStatus.Next,
          value: 'c',
        },
        y: {
          status: ProgressifyStatus.Complete,
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
          status: ProgressifyStatus.Started,
        },
        a: {
          status: ProgressifyStatus.Next,
          value: 'a',
        },
        b: {
          status: ProgressifyStatus.Error,
          error: 'error',
        },
      });
    });
  });
});
