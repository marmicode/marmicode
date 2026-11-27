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

  it('early-bird cohort shows its original price', () => {
    expect(cohortToPreview(FROM_DRIFT_TO_TRUST_FOR_ANGULAR)).toMatchObject({
      badge: 'Early bird',
      price: 1570,
      originalPrice: 1870,
    });
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

  it('versions carry their own next session', () => {
    const offers = toTrainingOffers({
      cohorts: [],
      workshops: TestBed.inject(WorkshopRepository).getWorkshops(),
      videoCourses: [],
      today: new Date('2026-11-27'),
    });
    const versions = offers.flatMap((offer) => offer.versions);
    const nextSessionDates = (id: string) =>
      versions.find((version) => version.id === id)?.nextSessionDates;

    expect
      .soft(nextSessionDates('pragmatic-angular-testing'))
      .toMatch(/^Jan 12\s?–\s?14$/);
    expect
      .soft(nextSessionDates('test-angular-pragmatique'))
      .toMatch(/^5\s?–\s?7 janv\.$/);
    expect.soft(nextSessionDates('pragmatic-react-testing')).toBeUndefined();
  });
});

describe(pickVersion, () => {
  it('picking a version follows the language filter', () => {
    const offer = findWorkshopOffer('pragmatic-angular-testing');

    expect
      .soft(pickVersion({ offer, language: null })?.title)
      .toBe('Pragmatic Angular Testing');
    expect
      .soft(pickVersion({ offer, language: 'fr' })?.title)
      .toBe('Test Angular Pragmatique');
  });

  it('english-only offers disappear in French', () => {
    const [offer] = toTrainingOffers({
      cohorts: [FROM_DRIFT_TO_TRUST_FOR_ANGULAR],
      workshops: [],
      videoCourses: [],
      today: new Date('2026-11-27'),
    });

    expect(pickVersion({ offer, language: 'fr' })).toBeNull();
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
