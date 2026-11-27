/**
 * What workshops and cohorts have in common.
 */
export interface Training {
  id: string;
  title: string;

  /**
   * The short title is used in lists.
   */
  shortTitle: string;
  location: 'online';

  /**
   * It supports markdown.
   */
  description: string;

  /**
   * If set, this will show a Join Waitlist button instead of a Book a Seat button.
   */
  waitlist?: {
    url: string;

    /**
     * Next session month in `YYYY-MM` format.
     * Displayed in the hero when set.
     */
    nextSessionMonth?: `${number}-${number}`;
  };

  /**
   * Tag used to show upcoming sessions.
   */
  lumaTag?: string;

  /**
   * The subheading is a short description of the training.
   * It is displayed in the banner, one line per line.
   */
  subheading: string;

  pictureAltText: string;
  pictureUri: string;

  offer: Offer;

  /**
   * The language of this training.
   * Used for filtering and display of language chip.
   */
  language: TrainingLanguage;

  requiredSkills: string[];
  benefits: Benefit[];
  agenda: Agenda;

  faqs: Faq[];
  testimonials?: Testimonial[];

  /**
   * Closing band of the page.
   * Defaults to a generic title and the subheading.
   */
  callToAction?: {
    title: string;
    description: string;
  };
}

export type TrainingLanguage = 'en' | 'fr';

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

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorPictureUri?: string;
  authorRole?: string;
  authorCompany?: string;
}
