export interface Workshop {
  id: string;
  title: string;
  type: 'tapas' | 'full';
  location: 'online';
  description: string;

  /**
   * The subheading is a short description of the workshop.
   * It is displayed in the workshop banner.
   *
   * It supports markdown.
   */
  subheading: string;

  pictureUri: string;
  thumbnailUri: string;

  /**
   * Workshop duration in days.
   */
  duration: number;

  /**
   * Google form url for the waitlist.
   */
  waitlistUrl: string;
  sessions: Session[];
  nextSessionDate?: Date;

  offer: Offer;

  requiredSkills: string[];
  benefits: Benefit[];
  agenda: Agenda;
}

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
