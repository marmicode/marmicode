import { Session, Workshop } from './workshop';

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
export function getUpcomingSessions(args: {
  workshops: Workshop[];
  today: Date;
}): UpcomingSession[] {
  throw new Error('🚧 work in progress');
}
