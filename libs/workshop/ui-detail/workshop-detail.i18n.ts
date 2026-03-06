import { WorkshopLanguage } from '@marmicode/workshop/core';
import { WORKSHOP_SHARED_LABELS } from '@marmicode/workshop/ui';

const WORKSHOP_DETAIL_LABELS_EN = {
  bookASession: 'Book a seat',
  joinWaitlist: 'Join Waitlist',
  priceStartsAt: 'starts at',
  requestACustomSession: 'Request a custom session',
  upcomingSessions: 'Upcoming sessions',
  whatYouWillLearn: 'What you will learn',
  requiredKnowledge: 'Required knowledge',
  program: 'Program',
  instructor: 'Your instructor',
  testimonials: 'What they say',
  faq: 'Frequently Asked Questions',
};

const WORKSHOP_DETAIL_LABELS_FR: typeof WORKSHOP_DETAIL_LABELS_EN = {
  bookASession: 'Réserver une place',
  joinWaitlist: "Rejoindre la liste d'attente",
  priceStartsAt: 'à partir de',
  requestACustomSession: 'Session sur mesure',
  upcomingSessions: 'Sessions à venir',
  whatYouWillLearn: 'Ce que vous apprendrez',
  requiredKnowledge: 'Prérequis',
  program: 'Programme',
  instructor: 'Votre formateur',
  testimonials: 'Retour des participants',
  faq: 'Foire aux questions',
};

export const WORKSHOP_DETAIL_LABELS: Record<
  WorkshopLanguage,
  typeof WORKSHOP_DETAIL_LABELS_EN & typeof WORKSHOP_SHARED_LABELS.en
> = {
  en: { ...WORKSHOP_SHARED_LABELS.en, ...WORKSHOP_DETAIL_LABELS_EN },
  fr: { ...WORKSHOP_SHARED_LABELS.fr, ...WORKSHOP_DETAIL_LABELS_FR },
};
