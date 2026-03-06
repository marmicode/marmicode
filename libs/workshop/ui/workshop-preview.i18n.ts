import { WorkshopLanguage } from '@marmicode/workshop/core';
import { WORKSHOP_SHARED_LABELS } from './workshop-shared.i18n';

const WORKSHOP_PREVIEW_LABELS_EN = {
  from: 'From',
  viewDetails: 'View details',
};

const WORKSHOP_PREVIEW_LABELS_FR: typeof WORKSHOP_PREVIEW_LABELS_EN = {
  from: 'À partir de',
  viewDetails: "Plus d'infos",
};

export const WORKSHOP_PREVIEW_LABELS: Record<
  WorkshopLanguage,
  typeof WORKSHOP_PREVIEW_LABELS_EN & typeof WORKSHOP_SHARED_LABELS.en
> = {
  en: { ...WORKSHOP_SHARED_LABELS.en, ...WORKSHOP_PREVIEW_LABELS_EN },
  fr: { ...WORKSHOP_SHARED_LABELS.fr, ...WORKSHOP_PREVIEW_LABELS_FR },
};
