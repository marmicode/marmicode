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
}: {
  startDate: IsoDate;
  endDate?: IsoDate;
}): Session {
  return {
    startDate,
    endDate,
    startTime: '09:30',
    endTime: '18:00',
    timezone: 'CET',
    url: `https://luma.com/${startDate}`,
  };
}
