import { IsoDate, Session } from '@marmicode/workshop/core';
import { describe, expect, it } from 'vitest';
import { formatSessionDates } from './format-session-dates';

describe(formatSessionDates.name, () => {
  it('formats dates in both languages', () => {
    const session = createSession({
      startDate: '2027-01-12',
      endDate: '2027-01-14',
    });

    expect(formatSessionDates({ session, language: 'en' })).toMatch(
      /Jan 12\s?–\s?14, 2027/,
    );
    expect(formatSessionDates({ session, language: 'fr' })).toMatch(
      /12\s?–\s?14 janv\. 2027/,
    );

    const shortDates = formatSessionDates({
      session,
      language: 'en',
      short: true,
    });
    expect(shortDates).toMatch(/Jan 12\s?–\s?14/);
    expect(shortDates).not.toMatch(/2027/);
  });

  it.todo('formats a range across months and a single day', () => {
    // - Assert Dec 30, 2026 → Jan 1, 2027 shows both months and years.
    // - Assert a session without `endDate` shows one day.
  });
});

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
