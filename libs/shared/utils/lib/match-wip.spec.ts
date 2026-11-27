import { describe, it } from 'vitest';
import { matchWip } from './match-wip';

describe(matchWip.name, () => {
  it.todo('matches only in WIP mode', () => {
    // Arrange a fake `LocalStorage` with `wip = 'true'`, then with no value.
    // Run `matchWip` in an injection context.
    // Assert `true`, then `false`.
  });
});
