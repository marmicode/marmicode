import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideSiteConfig } from '@marmicode/shared/core';
import { TODAY } from '@marmicode/shared/utils';
import { describe, expect, it } from 'vitest';
import { TrainingListPage } from './training-list-page.ng';

describe(TrainingListPage.name, () => {
  it('lists each workshop once with its languages', async () => {
    const { getGroup } = await mountTrainingListPage();

    const cards = getGroup('Workshops')?.cards.filter(
      (card) => card.title === 'Pragmatic Angular Testing',
    );

    expect(cards).toEqual([
      expect.objectContaining({ languages: ['🇬🇧 EN', '🇫🇷 FR'] }),
    ]);
  });

  it('groups trainings by format with a description', async () => {
    const { getGroups } = await mountTrainingListPage();

    expect(
      getGroups().map(({ heading, description }) => ({
        heading,
        description,
      })),
    ).toEqual([
      { heading: 'Cohort', description: expect.stringContaining('multi-week') },
      {
        heading: 'Workshops',
        description: expect.stringContaining('one to three days'),
      },
      {
        heading: 'Video course',
        description: expect.stringContaining('Self-paced'),
      },
    ]);
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

async function mountTrainingListPage({
  today = '2026-11-27',
}: { today?: string } = {}) {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
      { provide: TODAY, useValue: () => new Date(today) },
    ],
  });

  const fixture = TestBed.createComponent(TrainingListPage);
  await fixture.whenStable();

  const host: HTMLElement = fixture.nativeElement;

  /* One section per format, with a heading and its training tiles. */
  const getGroups = () =>
    Array.from(host.querySelectorAll('section'))
      .filter((section) => section.querySelector('h2'))
      .map((section) => ({
        heading: getAccessibleText(section.querySelector('h2')),
        description: getTextContent(section.querySelector(':scope > header p')),
        cards: Array.from(section.querySelectorAll('mc-training-tile')).map(
          (card) => ({
            title: getTextContent(card.querySelector('h3')),
            languages: Array.from(card.querySelectorAll('.language-chip')).map(
              (chip) => getTextContent(chip),
            ),
          }),
        ),
      }));

  return {
    getGroups,
    getGroup: (heading: string) =>
      getGroups().find((group) => group.heading === heading),
  };
}

function getTextContent(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, ' ').trim();
}

/* Good enough for headings: the text without the parts hidden from screen readers. */
function getAccessibleText(element: Element | null) {
  const clone = element?.cloneNode(true) as Element | undefined;
  clone
    ?.querySelectorAll('[aria-hidden="true"]')
    .forEach((hidden) => hidden.remove());
  return getTextContent(clone ?? null);
}
