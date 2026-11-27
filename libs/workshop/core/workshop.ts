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
   * Upcoming sessions, displayed on the workshop page, the home page and the training list.
   * Sessions in the past are ignored.
   */
  sessions: Session[];

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
   * First day of the session, in the session's timezone.
   * e.g. '2026-12-01'
   */
  startDate: IsoDate;

  /**
   * Last day of the session if multiple days.
   * e.g. '2026-12-02'
   */
  endDate?: IsoDate;

  /**
   * The daily start time of the session.
   * e.g. '09:30'
   */
  startTime: string;

  /**
   * The daily end time of the session.
   * e.g. '18:00'
   */
  endTime: string;

  /**
   * The timezone of the session.
   */
  timezone: 'CET' | 'PT';

  /**
   * Luma event page where attendees book a seat.
   */
  url: string;
}

/**
 * Date in `YYYY-MM-DD` format.
 */
export type IsoDate = `${number}-${number}-${number}`;

export function createWorkshop(workshop: Workshop): Workshop {
  return workshop;
}
