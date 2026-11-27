import { describe, it } from 'vitest';
import { CohortLandingPage } from './cohort-landing-page.ng';

describe(CohortLandingPage.name, () => {
  it.todo('banner shows the early-bird offer', () => {
    // Mount `CohortLandingPage`.
    // Assert "Early bird", €1,570, €1,870 crossed out, and "Early 2027".
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
