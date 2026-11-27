import { IsoDate, Session, Workshop } from './workshop';

/**
 * @deprecated 🚧 work in progress
 */
export interface UpcomingSession {
  workshop: Workshop;
  session: Session;
}

/**
 * Sessions whose last day (`endDate ?? startDate`) is today or later, soonest first.
 * Compares ISO date strings, so no timezone maths.
 *
 * @deprecated 🚧 work in progress
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
    .filter(({ session }) => session.startDate >= todayIsoDate)
    .sort((a, b) => a.session.startDate.localeCompare(b.session.startDate));
}

function toIsoDate(date: Date): IsoDate {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}` as IsoDate;
}
