import { Training } from '@marmicode/training/core';

export interface Cohort extends Training {
  /**
   * When the next cohort starts, e.g. "Early 2027".
   * Displayed in the banner.
   */
  nextCohort: string;

  /**
   * How the cohort is organized: the video course first,
   * then a live session every week, with the community in between.
   */
  schedule: {
    videoCourse: ScheduleTrack & { description: string };
    liveSession: Omit<ScheduleTrack, 'emoji'> & { duration: string };
    /**
     * One entry per week, each with a live session.
     */
    weeks: Array<{ emoji: string; title: string }>;
    community: ScheduleTrack & { description: string };
  };
}

interface ScheduleTrack {
  emoji: string;
  /**
   * When it happens, e.g. "Before week 1".
   */
  when: string;
  label: string;
}

export function createCohort(cohort: Cohort): Cohort {
  return {
    ...cohort,
    /* Pictures are imported with a relative path (same fix as in `WorkshopRepository`). */
    pictureUri: cohort.pictureUri.replace(/^\.\//, '/'),
  };
}
