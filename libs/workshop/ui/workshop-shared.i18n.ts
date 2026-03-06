import { WorkshopLanguage } from '@marmicode/workshop/core';

const WORKSHOP_SHARED_LABELS_EN = {
  day: 'Day',
  days: 'Days',
};

const WORKSHOP_SHARED_LABELS_FR: typeof WORKSHOP_SHARED_LABELS_EN = {
  day: 'Jour',
  days: 'Jours',
};

export const WORKSHOP_SHARED_LABELS: Record<
  WorkshopLanguage,
  typeof WORKSHOP_SHARED_LABELS_EN
> = {
  en: WORKSHOP_SHARED_LABELS_EN,
  fr: WORKSHOP_SHARED_LABELS_FR,
};
