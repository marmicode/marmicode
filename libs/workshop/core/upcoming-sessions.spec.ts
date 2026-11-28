import { describe, expect, it } from 'vitest';
import { getUpcomingSessions } from './upcoming-sessions';
import { IsoDate, Session, Workshop } from './workshop';

describe(getUpcomingSessions.name, () => {
  it('keeps upcoming sessions, soonest first', () => {
    const workshops = [
      createWorkshop({
        id: 'workshop-a',
        sessions: [
          createSession({ startDate: '2026-12-08' }),
          createSession({ startDate: '2026-11-20' }),
        ],
      }),
      createWorkshop({
        id: 'workshop-b',
        sessions: [createSession({ startDate: '2026-12-01' })],
      }),
    ];

    const upcomingSessions = getUpcomingSessions({
      workshops,
      today: new Date('2026-11-27T12:00:00Z'),
    });

    expect(upcomingSessions.map(({ session }) => session.startDate)).toEqual([
      '2026-12-01',
      '2026-12-08',
    ]);
  });

  it('keeps a session until its last day', () => {
    const workshops = [
      createWorkshop({
        id: 'workshop-a',
        sessions: [
          createSession({ startDate: '2026-11-26', endDate: '2026-11-28' }),
        ],
      }),
    ];

    expect(
      getUpcomingSessions({
        workshops,
        today: new Date('2026-11-28T12:00:00Z'),
      }),
    ).toHaveLength(1);

    expect(
      getUpcomingSessions({
        workshops,
        today: new Date('2026-11-29T12:00:00Z'),
      }),
    ).toHaveLength(0);
  });

  it("keeps a session until the end of its last day in the session's timezone", () => {
    const workshops = [
      createWorkshop({
        id: 'workshop-a',
        sessions: [createSession({ startDate: '2026-11-27', timezone: 'PT' })],
      }),
    ];

    /* 2026-11-27 17:00 in Los Angeles, but already 2026-11-28 in UTC. */
    expect(
      getUpcomingSessions({
        workshops,
        today: new Date('2026-11-28T01:00:00Z'),
      }),
    ).toHaveLength(1);
  });

  it("drops a session once its last day is over in the session's timezone", () => {
    const workshops = [
      createWorkshop({
        id: 'workshop-a',
        sessions: [createSession({ startDate: '2026-11-27', timezone: 'CET' })],
      }),
    ];

    /* 2026-11-28 00:30 in Paris, but still 2026-11-27 in UTC. */
    expect(
      getUpcomingSessions({
        workshops,
        today: new Date('2026-11-27T23:30:00Z'),
      }),
    ).toHaveLength(0);
  });
});

function createWorkshop({
  id,
  sessions,
}: {
  id: string;
  sessions: Session[];
}): Workshop {
  return { id, sessions } as Workshop;
}

function createSession({
  startDate,
  endDate,
  timezone = 'CET',
}: {
  startDate: IsoDate;
  endDate?: IsoDate;
  timezone?: Session['timezone'];
}): Session {
  return {
    startDate,
    endDate,
    startTime: '09:30',
    endTime: '18:00',
    timezone,
    url: `https://luma.com/${startDate}`,
  };
}
