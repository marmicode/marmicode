import { Training } from '@marmicode/training/core';

export interface Cohort extends Training {
  /**
   * When the next cohort starts, e.g. "Early 2027".
   * Displayed in the banner.
   */
  nextCohort: string;

  /**
   * How the cohort is organized week after week.
   * Displayed as a schedule with one live session per week.
   */
  schedule: {
    liveSession: { label: string; duration: string };
    videoCourse: { label: string; description: string };
    community: { label: string; description: string };
  };
}

export function createCohort(cohort: Cohort): Cohort {
  return {
    ...cohort,
    /* Pictures are imported with a relative path (same fix as in `WorkshopRepository`). */
    pictureUri: cohort.pictureUri.replace(/^\.\//, '/'),
  };
}
