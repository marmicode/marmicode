import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { matchWip } from './match-wip';
import {
  LocalStorageFake,
  provideLocalStorageFake,
} from './testing/local-storage.fake';

describe(matchWip.name, () => {
  it.todo('matches only in WIP mode', () => {
    const { localStorageFake, runMatchWip } = setUp();

    localStorageFake.setItem('wip', 'true');
    expect(runMatchWip()).toBe(true);

    localStorageFake.removeItem('wip');
    expect(runMatchWip()).toBe(false);
  });
});

function setUp() {
  TestBed.configureTestingModule({
    providers: [provideLocalStorageFake()],
  });

  return {
    localStorageFake: TestBed.inject(LocalStorageFake),
    runMatchWip: () =>
      TestBed.runInInjectionContext(() => matchWip({} as Route, [])),
  };
}
