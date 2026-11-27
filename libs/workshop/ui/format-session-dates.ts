import { IsoDate, Session, WorkshopLanguage } from '@marmicode/workshop/core';

/**
 * en: "Jan 12–14, 2027" (or "Dec 30, 2026 – Jan 1, 2027"); fr: "12–14 janv. 2027".
 * `short: true` drops the year: "Jan 12–14" / "5–7 janv.".
 * Uses `Intl.DateTimeFormat#formatRange` on UTC dates with `timeZone: 'UTC'`, so the day never shifts.
 *
 * @deprecated 🚧 work in progress
 */
export function formatSessionDates({
  session,
  language,
  short = false,
}: {
  session: Session;
  language: WorkshopLanguage;
  short?: boolean;
}): string {
  const format = new Intl.DateTimeFormat(LOCALES[language], {
    day: 'numeric',
    month: 'short',
    year: short ? undefined : 'numeric',
    timeZone: 'UTC',
  });
  return format.formatRange(
    toUtcDate(session.startDate),
    toUtcDate(session.endDate ?? session.startDate),
  );
}

const LOCALES: Record<WorkshopLanguage, string> = {
  en: 'en-US',
  fr: 'fr-FR',
};

function toUtcDate(isoDate: IsoDate): Date {
  return new Date(`${isoDate}T00:00:00Z`);
}

/**
 * "9:30–18:00 CET"
 *
 * @deprecated 🚧 work in progress
 */
export function formatSessionTimes(session: Session): string {
  throw new Error('🚧 work in progress');
}
