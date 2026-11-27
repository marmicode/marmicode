import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideSiteConfig } from '@marmicode/shared/core';
import { describe, expect, it } from 'vitest';
import { HomePage } from './home-page.ng';

describe(HomePage.name, () => {
  it('home tiles link to the three sections', async () => {
    const { getTiles } = await mountHomePage();

    expect(getTiles()).toEqual([
      { heading: 'The Library', href: '/learn/everything' },
      { heading: 'Training', href: '/workshops' },
      { heading: 'Coaching', href: '/coaching' },
    ]);
  });

  it.todo('hero chip points to the cohort', async () => {
    const { getHeroLink } = await mountHomePage();

    const chip = getHeroLink('From Drift to Trust');

    expect(chip?.text).toContain('6-week');
    expect(chip?.href).toBe('/cohorts/from-drift-to-trust-for-angular');
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

async function mountHomePage() {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
    ],
  });

  const fixture = TestBed.createComponent(HomePage);
  await fixture.whenStable();

  const host: HTMLElement = fixture.nativeElement;

  return {
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
