import { Training, TrainingLanguage } from '@marmicode/training/core';

export interface Workshop extends Training {
  /**
   * The alternate is used to display the workshops in the other languages.
   *
   * This field is populated by `WorkshopRepository`.
   */
  alternates?: Array<{ id: string; language: WorkshopLanguage }>;

  type: 'tapas' | 'full';

  /**
   * Tag used to show upcoming sessions.
   */
  lumaTag: string;

  thumbnailUri: string;

  /**
   * Workshop duration in days.
   */
  duration: number;

  /**
   * Google form url for custom session requests.
   */
  customSessionRequestUrl: string;
}

export type WorkshopLanguage = TrainingLanguage;

export interface Session {
  /**
   * The date of the session.
   */
  startDate: Date;

  /**
   * The end date of the session if multiple days.
   */
  endDate?: Date;

  /**
   * The start time of the session.
   * e.g. '18:00'
   */
  startTime: string;

  /**
   * The end time of the session.
   * e.g. '21:00'
   */
  endTime: string;

  /**
   * The timezone of the session.
   */
  timezone: 'CET' | 'PT';

  /**
   * Pre-filled google form url for the waitlist.
   */
  waitlistUrl: string;
}

export function createWorkshop(workshop: Workshop): Workshop {
  return workshop;
}
