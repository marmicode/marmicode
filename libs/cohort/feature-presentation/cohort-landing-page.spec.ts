import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import { provideSiteConfig } from '@marmicode/shared/core';
import { describe, expect, it } from 'vitest';
import { CohortLandingPage } from './cohort-landing-page.ng';

describe(CohortLandingPage.name, () => {
  it('banner shows the early-bird offer', async () => {
    const { getCrossedOutPrices, getHeroText } = await mountCohortLandingPage();

    expect(getHeroText()).toContain('Early bird');
    expect(getHeroText()).toContain('€1,570');
    expect(getCrossedOutPrices()).toEqual(['€1,870']);
    expect(getHeroText()).toContain('Early 2027');
  });

  it('route lists every week with its outcome', async () => {
    const { getRouteWeeks } = await mountCohortLandingPage();

    expect(getRouteWeeks()).toEqual(
      FROM_DRIFT_TO_TRUST_FOR_ANGULAR.schedule.weeks.map(
        ({ title, outcome }) => ({ title, outcome }),
      ),
    );
  });

  it('waitlist links at the top and the bottom', async () => {
    const { getLinks } = await mountCohortLandingPage();

    const waitlistLink = {
      href: 'https://docs.google.com/forms/d/1rQfN5CjQnxDJs6yoSKVMahPOVeYEX9DjDC7vEeRB-eU/viewform',
      target: '_blank',
    };
    expect(getLinks('Join the waitlist')).toEqual([waitlistLink, waitlistLink]);
  });

  it('keeps the canonical URL', async () => {
    const { getCanonicalUrls } = await mountCohortLandingPage();

    expect(getCanonicalUrls()).toEqual([
      'https://marmicode.io/cohorts/from-drift-to-trust-for-angular',
    ]);
  });
});

async function mountCohortLandingPage() {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
    ],
  });

  const fixture = TestBed.createComponent(CohortLandingPage);
  await fixture.whenStable();

  const host: HTMLElement = fixture.nativeElement;

  return {
    getCanonicalUrls() {
      return Array.from(
        document.head.querySelectorAll<HTMLLinkElement>(
          'link[rel="canonical"]',
        ),
        (link) => link.href,
      );
    },
    getHeroText() {
      return getTextContent(host.querySelector('mc-training-page-hero'));
    },
    /* The weeks of the route, in order: the week items are nested lists. */
    getRouteWeeks() {
      return Array.from(
        host.querySelectorAll('mc-cohort-route ol > li'),
        (week) => ({
          title: getTextContent(week.querySelector('h3')),
          outcome: getTextContent(week.querySelector('.outcome')),
        }),
      );
    },
    getLinks(text: string) {
      return Array.from(host.querySelectorAll<HTMLAnchorElement>('a'))
        .filter((anchor) => getTextContent(anchor).includes(text))
        .map((anchor) => ({
          href: anchor.getAttribute('href'),
          target: anchor.getAttribute('target'),
        }));
    },
    getCrossedOutPrices() {
      return Array.from(
        host.querySelectorAll('mc-training-page-hero s'),
        getTextContent,
      );
    },
  };
}

function getTextContent(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}
