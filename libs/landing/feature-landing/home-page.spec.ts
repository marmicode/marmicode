import { describe, it } from 'vitest';
import { HomePage } from './home-page.ng';

describe(HomePage.name, () => {
  it.todo('home tiles link to the three sections', () => {
    // Mount `HomePage` with the router.
    // Assert the tile headings in order are "The Library", "Training", "Coaching".
    // Assert they link to `/learn/everything`, `/workshops` and `/coaching`.
  });

  it.todo('hero chip points to the cohort', () => {
    // Mount `HomePage`.
    // Assert the chip mentions "From Drift to Trust" and "6-week", and links to `/cohorts/from-drift-to-trust-for-angular`.
  });

  it.todo('upcoming events list the workshop sessions', () => {
    // Provide `TODAY` as 2026-11-27 and mount `HomePage` with the real `WorkshopRepository`.
    // Assert the rows in order: Charted Coding (FR, Dec 1), Charted Coding (EN, Dec 8), Test Angular Pragmatique (Jan 5), Pragmatic Angular Testing (Jan 12).
    // Assert the last row links to `/workshops/pragmatic-angular-testing` and the first row has `lang="fr"`.
  });

  it.todo('no upcoming events', () => {
    // Provide `TODAY` as 2030-01-01 and mount `HomePage`.
    // Assert "No public session scheduled right now." and a link to `/workshops`.
  });
});
