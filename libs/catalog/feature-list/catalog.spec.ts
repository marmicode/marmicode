import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import { describe, expect, it } from 'vitest';
import { cohortToPreview, pickVersion, toTrainingOffers } from './catalog';

describe(cohortToPreview, () => {
  it('shows the duration in weeks', () => {
    expect(cohortToPreview(FROM_DRIFT_TO_TRUST_FOR_ANGULAR).duration).toBe(
      '6 Weeks',
    );
  });

  it('shows the duration in French for a French cohort', () => {
    expect(
      cohortToPreview({ ...FROM_DRIFT_TO_TRUST_FOR_ANGULAR, language: 'fr' })
        .duration,
    ).toBe('6 Semaines');
  });

  it.todo('early-bird cohort shows its original price', () => {
    // Map `FROM_DRIFT_TO_TRUST_FOR_ANGULAR`.
    // Assert `badge: 'Early bird'`, `price: 1570` and `originalPrice: 1870`.
  });
});

describe(toTrainingOffers, () => {
  it.todo('workshops with alternates become one offer', () => {
    // Call `toTrainingOffers` with the real `WorkshopRepository` workshops.
    // Assert one offer per workshop (6), each with versions `['en', 'fr']`.
  });

  it.todo('versions carry their own next session', () => {
    // Call `toTrainingOffers` with today = 2026-11-27.
    // Assert Pragmatic Angular Testing EN has next session "Jan 12–14", FR has "5–7 janv.", and Pragmatic React Testing has none.
  });
});

describe(pickVersion, () => {
  it.todo('picking a version follows the language filter', () => {
    // Take the Pragmatic Angular Testing offer.
    // Assert `pickVersion` with `null` gives "Pragmatic Angular Testing", with `'fr'` gives "Test Angular Pragmatique".
  });

  it.todo('english-only offers disappear in French', () => {
    // Take the cohort offer.
    // Assert `pickVersion` with `'fr'` returns `null`.
  });
});
