import { TRAINING_LABELS } from '@marmicode/training/ui';
import { WorkshopLanguage } from '@marmicode/workshop/core';
import { WORKSHOP_SHARED_LABELS } from '@marmicode/workshop/ui';

const WORKSHOP_DETAIL_LABELS_EN = {
  alsoAvailableInThisLanguage: 'Also available in English',
  bookASession: 'Book a seat',
  breadcrumbTraining: 'Training',
  breadcrumbWorkshops: 'Workshops',
  dayLowercase: 'day',
  daysLowercase: 'days',
  flag: '🇬🇧',
  glance: {
    duration: 'Duration',
    format: 'Format',
    formatValue: '🧑‍🍳 Live workshop',
    group: 'Group',
    groupValue: 'Small, hands-on',
    language: 'Language',
    location: 'Location',
    nextSession: 'Next session',
    price: 'Price',
  },
  languageName: '🇬🇧 English',
  limitedSpots: 'Limited Spots',
  nextSession: 'Next Session',
  noSessionScheduledYet: 'No session scheduled yet.',
  noneOfTheseDatesWork:
    'None of these dates work? Bring the workshop to your team.',
  online: 'Online',
  onTheStove: 'on the stove',
  opcoNote: '',
  orRequestACustomSession: 'or request a custom session for your team →',
  overview: 'overview',
  perSeat: 'per seat',
  programHandsOn: 'Hands-on',
  programHandsOnCount: 'hands-on exercises',
  programShowAll: 'Show the full program',
  programTalk: 'Talk',
  programTalkCount: 'talks',
  programMore: 'more',
  requestACustomSession: 'Request a custom session',
  sameWorkshopInThisLanguage: 'Same workshop in English',
  seeTheWorkshop: 'See the workshop',
  smallGroup: 'small group',
  upcomingSessions: 'Upcoming sessions',
};

const WORKSHOP_DETAIL_LABELS_FR: typeof WORKSHOP_DETAIL_LABELS_EN = {
  alsoAvailableInThisLanguage: 'Également disponible en français',
  bookASession: 'Réserver une place',
  breadcrumbTraining: 'Formations',
  breadcrumbWorkshops: 'Ateliers',
  dayLowercase: 'jour',
  daysLowercase: 'jours',
  flag: '🇫🇷',
  glance: {
    duration: 'Durée',
    format: 'Format',
    formatValue: '🧑‍🍳 Formation en direct',
    group: 'Groupe',
    groupValue: 'Petit, pratique',
    language: 'Langue',
    location: 'Lieu',
    nextSession: 'Prochaine session',
    price: 'Prix',
  },
  languageName: '🇫🇷 Français',
  limitedSpots: 'Places Limitées',
  nextSession: 'Prochaine Session',
  noSessionScheduledYet: 'Aucune session programmée pour le moment.',
  noneOfTheseDatesWork:
    'Aucune date ne vous convient ? Organisez la formation pour votre équipe.',
  online: 'En ligne',
  onTheStove: 'aux fourneaux',
  opcoNote: "🇫🇷 Formation finançable jusqu'à 100% via OPCO.",
  orRequestACustomSession:
    'ou demandez une session sur mesure pour votre équipe →',
  overview: 'aperçu',
  perSeat: 'par place',
  programHandsOn: 'Pratique',
  programHandsOnCount: 'exercices pratiques',
  programShowAll: 'Afficher tout le programme',
  programTalk: 'Présentation',
  programTalkCount: 'présentations',
  programMore: 'de plus',
  requestACustomSession: 'Session sur mesure',
  sameWorkshopInThisLanguage: 'Même formation en français',
  seeTheWorkshop: 'Voir la formation',
  smallGroup: 'petit groupe',
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
