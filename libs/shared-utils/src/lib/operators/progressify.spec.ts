import { beforeEach, describe, it } from '@jest/globals';
import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from '../testing/get-test-scheduler';
import { progressify, ProgressifyEvent } from './progressify';

describe('progressify', () => {
  let scheduler: TestScheduler;

  beforeEach(() => (scheduler = getTestScheduler()));

  it('should add progress info on complete', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('--a-b-c-|');
      const expected = '    x-a-b-c-(y|)';

      expectObservable(source$.pipe(progressify())).toBe(expected, {
        x: {
          type: 'started',
        },
        a: {
          type: 'next',
          value: 'a',
        },
        b: {
          type: 'next',
          value: 'b',
        },
        c: {
          type: 'next',
          value: 'c',
        },
        y: {
          type: 'complete',
        },
      } as { [key: string]: ProgressifyEvent<string> });
    });
  });

  it('should add progress info on error', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('--a-#');
      const expected = '    x-a-(b|)';

      expectObservable(source$.pipe(progressify())).toBe(expected, {
        x: {
          type: 'started',
        },
        a: {
          type: 'next',
          value: 'a',
        },
        b: {
          type: 'error',
          error: 'error',
        },
      } as { [key: string]: ProgressifyEvent<string> });
    });
  });
});
