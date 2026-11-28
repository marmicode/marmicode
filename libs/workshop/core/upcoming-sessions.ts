import { IsoDate, Session, Workshop } from './workshop';

export interface UpcomingSession {
  workshop: Workshop;
  session: Session;
}

/**
 * Sessions whose last day (`endDate ?? startDate`) is today or later in the
 * session's timezone, soonest first.
 */
export function getUpcomingSessions({
  workshops,
  today,
}: {
  workshops: Workshop[];
  today: Date;
}): UpcomingSession[] {
  return workshops
    .flatMap((workshop) =>
      workshop.sessions.map((session) => ({ workshop, session })),
    )
    .filter(
      ({ session }) =>
        (session.endDate ?? session.startDate) >=
        toIsoDate(today, session.timezone),
    )
    .sort((a, b) => a.session.startDate.localeCompare(b.session.startDate));
}

const IANA_TIMEZONES: Record<Session['timezone'], string> = {
  CET: 'Europe/Paris',
  PT: 'America/Los_Angeles',
};

/**
 * The calendar date of `date` in the given timezone, whatever the machine's timezone.
 */
function toIsoDate(date: Date, timezone: Session['timezone']): IsoDate {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: IANA_TIMEZONES[timezone],
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}` as IsoDate;
}
