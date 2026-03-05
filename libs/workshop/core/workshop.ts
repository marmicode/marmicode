import { Optional } from '@marmicode/shared/utils';

export interface Workshop {
  id: string;
  title: string;

  /**
   * The alternate is used to display the workshops in the other languages.
   * This field is populated by `WorkshopRepository`.
   */
  alternates?: Array<{ id: string; language: WorkshopLanguage }>;

  /**
   * The short title is used in the list page.
   */
  shortTitle: string;
  type: 'tapas' | 'full';
  location: 'online';
  description: string;

  /**
   * If set, this will show a Join Waitlist button instead of a Book a Seat button.
   */
  waitlistUrl?: string;

  /**
   * Tag used to show upcoming sessions.
   */
  lumaTag: string;

  /**
   * The subheading is a short description of the workshop.
   * It is displayed in the workshop banner.
   *
   * It supports markdown.
   */
  subheading: string;

  pictureAltText: string;
  pictureUri: string;
  thumbnailUri: string;

  /**
   * Workshop duration in days.
   */
  duration: number;

  /**
   * Google form url for custom session requests.
   */
  customSessionRequestUrl: string;

  offer: Offer;

  /**
   * The language of this workshop.
   * Used for filtering and display of language chip.
   */
  language: WorkshopLanguage;

  requiredSkills: string[];
  benefits: Benefit[];
  agenda: Agenda;

  faqs: Faq[];
}

export interface Faq {
  question: string;
  answer: string;
}

export type WorkshopLanguage = 'en' | 'fr';

export type Offer = EarlyBirdOffer | LastMinuteOffer;

export interface EarlyBirdOffer {
  type: 'early-bird';
  price: number;
  originalPrice: number;
}

export interface LastMinuteOffer {
  type: 'last-minute';
  price: number;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface Agenda {
  sections: AgendaSection[];
}

export interface AgendaSection {
  title: string;
  items: string[];
}

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
