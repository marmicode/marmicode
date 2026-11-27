import { describe, it } from 'vitest';
import { formatSessionDates } from './format-session-dates';

describe(formatSessionDates.name, () => {
  it.todo('formats dates in both languages', () => {
    // - Assert `formatSessionDates` for Jan 12–14, 2027 in `en` matches `/Jan 12\s?–\s?14, 2027/`, and in `fr` matches `/12\s?–\s?14 janv\. 2027/`.
    // - Assert `short: true` gives "Jan 12–14" without the year (same regex style).
  });

  it.todo('formats a range across months and a single day', () => {
    // - Assert Dec 30, 2026 → Jan 1, 2027 shows both months and years.
    // - Assert a session without `endDate` shows one day.
  });
});
