import { describe, it } from 'vitest';
import { getUpcomingSessions } from './upcoming-sessions';

describe(getUpcomingSessions.name, () => {
  it.todo('keeps upcoming sessions, soonest first', () => {
    // - Arrange two workshops: one with sessions on 2026-12-08 and 2026-11-20, one with a session on 2026-12-01.
    // - Call `getUpcomingSessions` with today = 2026-11-27.
    // - Assert the start dates are `['2026-12-01', '2026-12-08']`.
  });

  it.todo('keeps a session until its last day', () => {
    // - Arrange a session from 2026-11-26 to 2026-11-28.
    // - Assert it is kept on 2026-11-28 and dropped on 2026-11-29.
  });
});
