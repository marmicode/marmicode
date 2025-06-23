export interface Workshop {
  title: string;
  type: 'tapas' | 'full';

  /**
   * The subheading is a short description of the workshop.
   * It is displayed in the workshop banner.
   *
   * It supports markdown.
   */
  subheading: string;

  pictureUri: string;

  /**
   * Workshop duration in days.
   */
  duration: number;
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

export function createWorkshop(workshop: Workshop): Workshop {
  return workshop;
}
