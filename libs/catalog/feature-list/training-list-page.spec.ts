import { describe, it } from 'vitest';
import { TrainingListPage } from './training-list-page.ng';

describe(TrainingListPage.name, () => {
  it.todo('lists each workshop once with its languages', () => {
    // Mount `TrainingListPage`.
    // Assert one "Pragmatic Angular Testing" workshop card, with language chips EN and FR.
  });

  it.todo('groups trainings by format with a description', () => {
    // Mount `TrainingListPage`.
    // Assert the group headings in order are Cohort, Workshops, Video course.
    // Assert each has its description (e.g. Workshops mentions "one to three days").
  });

  it.todo('french filter shows French copy only', () => {
    // Mount, then click "Français".
    // Assert the cards show "Test Angular Pragmatique", no cohort or video course groups, and French group descriptions.
  });

  it.todo('combines format and language filters', () => {
    // Click "Workshops", then "Français".
    // Assert only workshop cards, all in French, and the count says "6 trainings".
  });

  it.todo('shows everything again when nothing matches', () => {
    // Click "Cohort", then "Français".
    // Assert "Nothing matches these filters yet.".
    // Click **Show everything** and assert all groups are back.
  });

  it.todo('cards keep their links', () => {
    // Assert the cohort links to `/cohorts/from-drift-to-trust-for-angular`.
    // Assert the video course links to the course URL in a new tab.
    // Assert a French workshop links to its French detail page.
  });

  it.todo('cards show the next session', () => {
    // Provide `TODAY` as 2026-11-27 and mount.
    // Assert the Pragmatic Angular Testing card shows "Next · Jan 12–14" and the Pragmatic React Testing card shows no next session.
  });

  it.todo('cards are announced in their language', () => {
    // Filter "Français".
    // Assert a card has `lang="fr"` and visually hidden text in French.
  });
});
