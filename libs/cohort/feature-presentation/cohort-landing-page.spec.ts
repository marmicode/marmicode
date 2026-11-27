import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
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

  it.todo('route lists every week with its outcome', () => {
    // Assert one entry per week of `FROM_DRIFT_TO_TRUST_FOR_ANGULAR.schedule.weeks`, in order, each with its title and outcome.
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
