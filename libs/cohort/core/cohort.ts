import { Training } from '@marmicode/training/core';

export interface Cohort extends Training {
  /**
   * When the next cohort starts, e.g. "Early 2027".
   * Displayed in the banner.
   */
  nextCohort: string;
}

export function createCohort(cohort: Cohort): Cohort {
  return {
    ...cohort,
    /* Pictures are imported with a relative path (same fix as in `WorkshopRepository`). */
    pictureUri: cohort.pictureUri.replace(/^\.\//, '/'),
  };
}
