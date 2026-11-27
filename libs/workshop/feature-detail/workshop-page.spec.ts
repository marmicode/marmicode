import { describe, it } from 'vitest';
import { WorkshopPage } from './workshop-page.ng';

describe(WorkshopPage.name, () => {
  it.todo('lists upcoming sessions with Luma links', () => {
    // Provide `TODAY` as 2026-11-27 and mount `WorkshopPage` with `workshopId="pragmatic-angular-testing"`.
    // Assert the session row mentions Jan 12–14, 2027 and "9:30–18:00 CET".
    // Assert **Book a seat** links to `https://luma.com/73n2dvji` with `target="_blank"`.
  });

  it.todo('shows the other-language sessions', () => {
    // Same page.
    // Assert a row with `lang="fr"` mentions janvier 2027 and links to `/workshops/test-angular-pragmatique`.
  });

  it.todo('no upcoming session', () => {
    // Mount with `workshopId="pragmatic-react-testing"`.
    // Assert "No session scheduled yet." and the custom session link.
    // Assert the "at a glance" card has no "Next session" entry.
  });

  it.todo('hero and at a glance', () => {
    // Assert the breadcrumb links to `/workshops`, the price "€1,270", and the at-a-glance next session "Jan 12–14, 2027".
  });

  it.todo('program shows 8 items, then the rest', () => {
    // Assert 8 visible timeline items and a "Show the full program" toggle; open it and assert every agenda item is listed.
  });

  it.todo('french workshop in French', () => {
    // Mount with `workshopId="test-angular-pragmatique"`.
    // Assert "Réserver une place", French session dates, and the OPCO note.
  });
});
