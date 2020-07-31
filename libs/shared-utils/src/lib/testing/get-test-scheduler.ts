import { TestScheduler } from 'rxjs/testing';

/* @hack so we don't have to fix jest configuration and include this file. */
declare var expect: any;

export function getTestScheduler() {
  return new TestScheduler((actual, expected) =>
    expect(actual).toEqual(expected)
  );
}
