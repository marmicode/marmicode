import { TestBed } from '@angular/core/testing';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { describe, expect, it } from 'vitest';
import {
  cohortToPreview,
  pickVersion,
  toTrainingOffers,
  TrainingOffer,
} from './catalog';

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
  it('workshops with alternates become one offer', () => {
    const offers = toTrainingOffers({
      cohorts: [],
      workshops: TestBed.inject(WorkshopRepository).getWorkshops(),
      videoCourses: [],
      today: new Date('2026-11-27'),
    });

    expect(
      offers.map((offer) => offer.versions.map((version) => version.language)),
    ).toEqual(Array.from({ length: 6 }, () => ['en', 'fr']));
  });

  it.todo('versions carry their own next session', () => {
    // Call `toTrainingOffers` with today = 2026-11-27.
    // Assert Pragmatic Angular Testing EN has next session "Jan 12–14", FR has "5–7 janv.", and Pragmatic React Testing has none.
  });
});

describe(pickVersion, () => {
  it.todo('picking a version follows the language filter', () => {
    const offer = findWorkshopOffer('pragmatic-angular-testing');

    expect
      .soft(pickVersion({ offer, language: null })?.title)
      .toBe('Pragmatic Angular Testing');
    expect
      .soft(pickVersion({ offer, language: 'fr' })?.title)
      .toBe('Test Angular Pragmatique');
  });

  it.todo('english-only offers disappear in French', () => {
    // Take the cohort offer.
    // Assert `pickVersion` with `'fr'` returns `null`.
  });
});

function findWorkshopOffer(workshopId: string): TrainingOffer {
  const offer = toTrainingOffers({
    cohorts: [],
    workshops: TestBed.inject(WorkshopRepository).getWorkshops(),
    videoCourses: [],
    today: new Date('2026-11-27'),
  }).find((offer) =>
    offer.versions.some((version) => version.id === workshopId),
  );
  if (offer == null) {
    throw new Error(`Offer not found: ${workshopId}`);
  }
  return offer;
}
