import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import { describe, expect, it } from 'vitest';
import { cohortToPreview } from './catalog';

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
});
