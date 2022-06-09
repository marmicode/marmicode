import { TestScheduler } from 'rxjs/testing';

/* @hack so we don't have to fix jest configuration and include this file. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let expect: any;

export function getTestScheduler() {
  return new TestScheduler((actual, expected) =>
    expect(actual).toEqual(expected)
  );
}
