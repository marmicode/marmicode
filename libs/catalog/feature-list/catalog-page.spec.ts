import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideSiteConfig } from '@marmicode/shared/core';
import { describe, expect, it, vi } from 'vitest';
import { CatalogPage } from './catalog-page.ng';

describe(CatalogPage, () => {
  it('lists the cohort, the workshops and the video course', async () => {
    const { getCards } = mountCatalogPage();

    await expect
      .poll(() => getCards())
      .toEqual(
        expect.arrayContaining([
          { format: '👥 Cohort', title: 'From Drift to Trust' },
          { format: '🧑‍🍳 Workshop', title: 'Pragmatic Angular Testing' },
          { format: '🧑‍🍳 Formation', title: 'Test Angular Pragmatique' },
          { format: '🎬 Video course', title: 'Pragmatic Angular Testing' },
        ]),
      );
  });

  it('groups trainings by format: the cohort first, then the workshops, then the video course', async () => {
    const { getGroups } = mountCatalogPage();

    await expect
      .poll(() => getGroups())
      .toEqual([
        ['👥 Cohort'],
        ['🧑‍🍳 Workshop', '🧑‍🍳 Formation'],
        ['🎬 Video course'],
      ]);
  });

  it('hides the groups with no matching training', async () => {
    const { getGroups, click } = mountCatalogPage();

    await click('French');

    await expect.poll(() => getGroups()).toEqual([['🧑‍🍳 Formation']]);
  });

  it('links the video course to the course platform', async () => {
    const { getCardLink } = mountCatalogPage();

    await expect
      .poll(() => getCardLink('🎬 Video course'))
      .toBe('https://courses.marmicode.io/courses/pragmatic-angular-testing');
  });

  it('links the cohort to its page', async () => {
    const { getCardLink } = mountCatalogPage();

    await expect
      .poll(() => getCardLink('👥 Cohort'))
      .toBe('/cohorts/from-drift-to-trust-for-angular');
  });

  it('filters by format', async () => {
    const { getCards, click } = mountCatalogPage();

    await click('Cohort');

    await expect
      .poll(() => getCards())
      .toEqual([{ format: '👥 Cohort', title: 'From Drift to Trust' }]);
  });

  it('combines the language and format filters', async () => {
    const { getCards, click } = mountCatalogPage();

    await click('French');
    await click('Workshop');

    await expect
      .poll(() => new Set(getCards().map(({ format }) => format)))
      .toEqual(new Set(['🧑‍🍳 Formation']));
  });

  it('shows everything again when no training matches the filters', async () => {
    const { getCards, click, getEmptyStateText } = mountCatalogPage();

    await click('French');
    await click('Video course');

    await expect
      .poll(() => getEmptyStateText())
      .toContain('Nothing matches these filters yet.');

    await click('SHOW EVERYTHING');

    await expect
      .poll(() => getCards())
      .toEqual(
        expect.arrayContaining([
          { format: '👥 Cohort', title: 'From Drift to Trust' },
          { format: '🧑‍🍳 Formation', title: 'Test Angular Pragmatique' },
        ]),
      );
  });

  it('explains the formats in a bubble', async () => {
    const { click, getFormatInfo } = mountCatalogPage();

    await click('What do the formats mean?');

    await expect
      .poll(() => getFormatInfo())
      .toEqual([
        expect.stringContaining('Video course'),
        expect.stringContaining('Cohort'),
        expect.stringContaining('Workshop'),
      ]);
    expect(getFormatInfo()[0]).toContain('Self-paced');
  });

  it('explains the formats in French when French is selected', async () => {
    const { click, getFormatInfo, getFormatFilterOptions } = mountCatalogPage();

    await click('French');
    await click('Que signifient les formats ?');

    await expect
      .poll(() => getFormatInfo())
      .toEqual([
        expect.stringContaining('Cours vidéo'),
        expect.stringContaining('Cohorte'),
        expect.stringContaining('Formation'),
      ]);
    expect(getFormatInfo()[0]).toContain('À votre rythme');
    expect(getFormatFilterOptions()).toEqual([
      'All',
      '🎬 Video course',
      '👥 Cohort',
      '🧑‍🍳 Workshop',
    ]);
  });

  it('announces the language of each card in that language', async () => {
    const { getCardLanguages } = mountCatalogPage();

    await expect
      .poll(() => getCardLanguages('Test Angular Pragmatique'))
      .toEqual({ lang: 'fr', label: 'Langue : français' });
    expect(getCardLanguages('From Drift to Trust')).toEqual({
      lang: 'en',
      label: 'Language: English',
    });
  });
});

function mountCatalogPage() {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
    ],
  });

  /* The returned fixture is deliberately ignored. */
  TestBed.createComponent(CatalogPage);

  const findButton = (name: string) =>
    vi.waitUntil(() =>
      Array.from(document.querySelectorAll('button')).find(
        (button) =>
          button.getAttribute('aria-label') === name ||
          button.textContent?.trim().endsWith(name),
      ),
    );

  const getCardElements = () =>
    Array.from(document.querySelectorAll('mc-training-preview'));

  const normalize = (text?: string | null) => text?.replace(/\s+/g, ' ').trim();

  const getCards = () =>
    getCardElements().map((card) => ({
      format: normalize(card.querySelector('.format-chip')?.textContent),
      title: normalize(card.querySelector('h3')?.textContent),
    }));

  return {
    getCards,
    /* The distinct formats of the cards in each list. */
    getGroups: () =>
      Array.from(document.querySelectorAll('.list')).map((list) => [
        ...new Set(
          Array.from(list.querySelectorAll('.format-chip')).map((chip) =>
            normalize(chip.textContent),
          ),
        ),
      ]),
    getCardLink: (format: string) =>
      getCardElements()
        .find(
          (card) =>
            normalize(card.querySelector('.format-chip')?.textContent) ===
            format,
        )
        ?.querySelector('h3 a')
        ?.getAttribute('href'),
    getEmptyStateText: () =>
      document.querySelector('[role="status"]')?.textContent ?? '',
    getFormatInfo: () =>
      Array.from(document.querySelectorAll('[role="dialog"] .format')).map(
        (format) => normalize(format.textContent) ?? '',
      ),
    getFormatFilterOptions: () =>
      Array.from(
        document.querySelectorAll(
          '[aria-label="Filter by format"] mat-button-toggle',
        ),
      ).map((option) => normalize(option.textContent)),
    /* The card's language, and how screen readers announce it. */
    getCardLanguages: (title: string) => {
      const card = getCardElements().find(
        (card) => normalize(card.querySelector('h3')?.textContent) === title,
      );
      return {
        lang: card?.querySelector('[role="article"]')?.getAttribute('lang'),
        label: normalize(
          card?.querySelector('.language-chip .visually-hidden')?.textContent,
        ),
      };
    },
    /* Clicks a filter or a button by its text or label. */
    click: async (name: string) => (await findButton(name)).click(),
  };
}
