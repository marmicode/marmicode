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

  it.todo('waitlist links at the top and the bottom', () => {
    // Assert two **Join the waitlist** links to the waitlist URL, opened in a new tab.
  });

  it.todo('keeps the canonical URL', () => {
    // Assert the canonical link is `/cohorts/from-drift-to-trust-for-angular`.
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
