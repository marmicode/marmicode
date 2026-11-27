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

  it('french filter shows French copy only', async () => {
    const { click, getGroups } = await mountTrainingListPage();

    await click('Français');

    const groups = getGroups();
    const titles = groups.flatMap(({ cards }) =>
      cards.map(({ title }) => title),
    );
    /* Only the workshops are offered in French. */
    expect(groups).toEqual([
      expect.objectContaining({
        description: expect.stringContaining('un à trois jours'),
      }),
    ]);
    expect(titles).toContain('Test Angular Pragmatique');
    expect(titles).not.toContain('Pragmatic Angular Testing');
  });

  it('combines format and language filters', async () => {
    const { click, getCount, getGroups } = await mountTrainingListPage();

    await click('Workshops');
    await click('Français');

    const groups = getGroups();
    expect(groups.map(({ heading }) => heading)).toEqual(['Formations']);
    expect(new Set(groups[0]?.cards.map(({ lang }) => lang))).toEqual(
      new Set(['fr']),
    );
    expect(getCount()).toBe('6 trainings');
  });

  it('shows everything again when nothing matches', async () => {
    const { click, getGroups, getText } = await mountTrainingListPage();

    await click('Cohort');
    await click('Français');

    expect(getGroups()).toEqual([]);
    expect(getText()).toContain('Nothing matches these filters yet.');

    await click('Show everything');

    expect(getGroups().map(({ heading }) => heading)).toEqual([
      'Cohort',
      'Workshops',
      'Video course',
    ]);
  });

  it('cards keep their links', async () => {
    const { click, getGroup } = await mountTrainingListPage();

    expect(getGroup('Cohort')?.cards[0]?.link).toEqual({
      href: '/cohorts/from-drift-to-trust-for-angular',
      target: null,
    });
    expect(getGroup('Video course')?.cards[0]?.link).toEqual({
      href: 'https://courses.marmicode.io/courses/pragmatic-angular-testing',
      target: '_blank',
      rel: 'noopener',
    });

    await click('Français');

    expect(
      getGroup('Formations')?.cards.find(
        ({ title }) => title === 'Test Angular Pragmatique',
      )?.link,
    ).toEqual({ href: '/workshops/test-angular-pragmatique', target: null });
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
            lang: card.querySelector('[lang]')?.getAttribute('lang'),
            link: getLink(card.querySelector('h3 a')),
            languages: Array.from(card.querySelectorAll('.language-chip')).map(
              (chip) => getTextContent(chip),
            ),
          }),
        ),
      }));

  return {
    /* Clicks a filter or a button by its accessible text. */
    async click(name: string) {
      Array.from(host.querySelectorAll('button'))
        .find((button) => getAccessibleText(button) === name)
        ?.click();
      await fixture.whenStable();
    },
    /* The live count of matching trainings. */
    getCount: () => getTextContent(host.querySelector('[role="status"]')),
    getGroups,
    getText: () => getTextContent(host),
    getGroup: (heading: string) =>
      getGroups().find((group) => group.heading === heading),
  };
}

/* The link's destination, and whether it opens in a new tab. */
function getLink(anchor: Element | null) {
  if (!anchor) {
    return undefined;
  }
  const target = anchor.getAttribute('target');
  return {
    href: anchor.getAttribute('href'),
    target,
    ...(target === '_blank' ? { rel: anchor.getAttribute('rel') } : {}),
  };
}

function getTextContent(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, ' ').trim();
}

/* Good enough for headings and buttons: the text without the parts hidden from screen readers. */
function getAccessibleText(element: Element | null) {
  const clone = element?.cloneNode(true) as Element | undefined;
  clone
    ?.querySelectorAll('[aria-hidden="true"]')
    .forEach((hidden) => hidden.remove());
  return getTextContent(clone ?? null);
}
