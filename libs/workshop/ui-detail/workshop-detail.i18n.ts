import { TRAINING_LABELS } from '@marmicode/training/ui';
import { WorkshopLanguage } from '@marmicode/workshop/core';
import { WORKSHOP_SHARED_LABELS } from '@marmicode/workshop/ui';

const WORKSHOP_DETAIL_LABELS_EN = {
  bookASession: 'Book a seat',
  limitedSpots: 'Limited Spots',
  nextSession: 'Next Session',
  requestACustomSession: 'Request a custom session',
  upcomingSessions: 'Upcoming sessions',
};

const WORKSHOP_DETAIL_LABELS_FR: typeof WORKSHOP_DETAIL_LABELS_EN = {
  bookASession: 'Réserver une place',
  limitedSpots: 'Places Limitées',
  nextSession: 'Prochaine Session',
  requestACustomSession: 'Session sur mesure',
  upcomingSessions: 'Sessions à venir',
};

export const WORKSHOP_DETAIL_LABELS: Record<
  WorkshopLanguage,
  typeof WORKSHOP_DETAIL_LABELS_EN &
    typeof WORKSHOP_SHARED_LABELS.en &
    typeof TRAINING_LABELS.en
> = {
  en: {
    ...TRAINING_LABELS.en,
    ...WORKSHOP_SHARED_LABELS.en,
    ...WORKSHOP_DETAIL_LABELS_EN,
  },
  fr: {
    ...TRAINING_LABELS.fr,
    ...WORKSHOP_SHARED_LABELS.fr,
    ...WORKSHOP_DETAIL_LABELS_FR,
  },
};
