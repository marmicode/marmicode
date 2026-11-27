import { Session, WorkshopLanguage } from '@marmicode/workshop/core';

/**
 * en: "Jan 12–14, 2027" (or "Dec 30, 2026 – Jan 1, 2027"); fr: "12–14 janv. 2027".
 * `short: true` drops the year: "Jan 12–14" / "5–7 janv.".
 * Uses `Intl.DateTimeFormat#formatRange` on UTC dates with `timeZone: 'UTC'`, so the day never shifts.
 *
 * @deprecated 🚧 work in progress
 */
export function formatSessionDates(args: {
  session: Session;
  language: WorkshopLanguage;
  short?: boolean;
}): string {
  throw new Error('🚧 work in progress');
}

/**
 * "9:30–18:00 CET"
 *
 * @deprecated 🚧 work in progress
 */
export function formatSessionTimes(session: Session): string {
  throw new Error('🚧 work in progress');
}
