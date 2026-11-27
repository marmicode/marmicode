import { TRAINING_LABELS } from '@marmicode/training/ui';
import { WorkshopLanguage } from '@marmicode/workshop/core';
import { WORKSHOP_SHARED_LABELS } from '@marmicode/workshop/ui';

const WORKSHOP_DETAIL_LABELS_EN = {
  bookASession: 'Book a seat',
  dayLowercase: 'day',
  daysLowercase: 'days',
  languageName: '🇬🇧 English',
  limitedSpots: 'Limited Spots',
  nextSession: 'Next Session',
  online: 'Online',
  onTheStove: 'on the stove',
  requestACustomSession: 'Request a custom session',
  sameWorkshopInThisLanguage: 'Same workshop in English',
  seeTheWorkshop: 'See the workshop',
  upcomingSessions: 'Upcoming sessions',
};

const WORKSHOP_DETAIL_LABELS_FR: typeof WORKSHOP_DETAIL_LABELS_EN = {
  bookASession: 'Réserver une place',
  dayLowercase: 'jour',
  daysLowercase: 'jours',
  languageName: '🇫🇷 Français',
  limitedSpots: 'Places Limitées',
  nextSession: 'Prochaine Session',
  online: 'En ligne',
  onTheStove: 'aux fourneaux',
  requestACustomSession: 'Session sur mesure',
  sameWorkshopInThisLanguage: 'Même formation en français',
  seeTheWorkshop: 'Voir la formation',
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
