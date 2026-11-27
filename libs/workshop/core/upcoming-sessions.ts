import { IsoDate, Session, Workshop } from './workshop';

export interface UpcomingSession {
  workshop: Workshop;
  session: Session;
}

/**
 * Sessions whose last day (`endDate ?? startDate`) is today or later, soonest first.
 * Compares ISO date strings, so no timezone maths.
 */
export function getUpcomingSessions({
  workshops,
  today,
}: {
  workshops: Workshop[];
  today: Date;
}): UpcomingSession[] {
  const todayIsoDate = toIsoDate(today);
  return workshops
    .flatMap((workshop) =>
      workshop.sessions.map((session) => ({ workshop, session })),
    )
    .filter(
      ({ session }) => (session.endDate ?? session.startDate) >= todayIsoDate,
    )
    .sort((a, b) => a.session.startDate.localeCompare(b.session.startDate));
}

/**
 * Uses the UTC date so the result doesn't depend on the machine's timezone.
 */
function toIsoDate(date: Date): IsoDate {
  return date.toISOString().slice(0, 10) as IsoDate;
}
