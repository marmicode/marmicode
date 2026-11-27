import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideSiteConfig } from '@marmicode/shared/core';
import { TODAY } from '@marmicode/shared/utils';
import { describe, expect, it } from 'vitest';
import { HomePage } from './home-page.ng';

describe(HomePage.name, () => {
  it('home tiles link to the three sections', async () => {
    const { getTiles } = await mountHomePage();

    expect(getTiles()).toEqual([
      { heading: 'The Library', href: '/library' },
      { heading: 'Training', href: '/workshops' },
      { heading: 'Coaching', href: '/coaching' },
    ]);
  });

  it('hero chip points to the cohort', async () => {
    const { getHeroLink } = await mountHomePage();

    const chip = getHeroLink('From Drift to Trust');

    expect(chip?.text).toContain('6-week');
    expect(chip?.href).toBe('/cohorts/from-drift-to-trust-for-angular');
  });

  it('upcoming events list the workshop sessions', async () => {
    const { getEventRows } = await mountHomePage({ today: '2026-11-27' });

    const rows = getEventRows();

    expect(rows.map(({ date, title }) => ({ date, title }))).toEqual([
      {
        date: 'DEC 01',
        title: 'Charted Coding : développement assisté par IA sans dérive',
      },
      {
        date: 'DEC 08',
        title: 'Charted Coding: AI-Assisted Development Without the Drift',
      },
      { date: 'JAN 05', title: 'Test Angular Pragmatique' },
      { date: 'JAN 12', title: 'Pragmatic Angular Testing' },
    ]);
    expect(rows.at(-1)?.href).toBe('/workshops/pragmatic-angular-testing');
    expect(rows[0]?.lang).toBe('fr');
  });

  it('no upcoming events', async () => {
    const { getEventRows, getEventsText, getEventsLinks } = await mountHomePage(
      { today: '2030-01-01' },
    );

    expect(getEventRows()).toEqual([]);
    expect(getEventsText()).toContain('No public session scheduled right now.');
    expect(getEventsLinks()).toEqual(['/workshops']);
  });
});

async function mountHomePage({
  today = '2026-11-27',
}: { today?: string } = {}) {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
      { provide: TODAY, useValue: () => new Date(today) },
    ],
  });

  const fixture = TestBed.createComponent(HomePage);
  await fixture.whenStable();

  const host: HTMLElement = fixture.nativeElement;

  return {
    /* Each upcoming session is a link with a date tile and a heading. */
    getEventRows() {
      return Array.from(
        host.querySelectorAll<HTMLAnchorElement>('mc-upcoming-session-list a'),
      )
        .filter((anchor) => anchor.querySelector('h3'))
        .map((anchor) => ({
          date: getTextContent(anchor.querySelector('time')),
          title: getTextContent(anchor.querySelector('h3')),
          href: anchor.getAttribute('href'),
          lang: anchor.getAttribute('lang'),
        }));
    },
    getEventsLinks() {
      return Array.from(
        host.querySelectorAll<HTMLAnchorElement>('mc-upcoming-session-list a'),
      ).map((anchor) => anchor.getAttribute('href'));
    },
    getEventsText() {
      return getTextContent(host.querySelector('mc-upcoming-session-list'));
    },
    /* First link of the hero that contains `text`. */
    getHeroLink(text: string) {
      const anchor = Array.from(
        host.querySelectorAll<HTMLAnchorElement>('mc-home-hero a'),
      ).find((anchor) => getTextContent(anchor)?.includes(text));

      return anchor
        ? { text: getTextContent(anchor), href: anchor.getAttribute('href') }
        : undefined;
    },
    /* Each tile is a link with a heading. */
    getTiles() {
      return Array.from(
        host.querySelectorAll<HTMLAnchorElement>('mc-home-tiles a'),
      ).map((anchor) => ({
        heading: getTextContent(anchor.querySelector('h3')),
        href: anchor.getAttribute('href'),
      }));
    },
  };
}

function getTextContent(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, ' ').trim();
}
