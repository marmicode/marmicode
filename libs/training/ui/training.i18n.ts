import { TrainingLanguage } from '@marmicode/training/core';

const TRAINING_LABELS_EN = {
  callToActionTitle: "Dinner's ready!",
  earlyBird: '🐣 Early Bird',
  faq: 'Frequently Asked Questions',
  instructor: 'Your instructor',
  joinWaitlist: 'Join Waitlist',
  lastMinute: '⏰ Last Minute',
  priceStartsAt: 'starts at',
  program: 'Program',
  requiredKnowledge: 'Required knowledge',
  testimonials: 'What they say',
  whatYouWillLearn: 'What you will learn',
};

const TRAINING_LABELS_FR: typeof TRAINING_LABELS_EN = {
  callToActionTitle: 'À table !',
  earlyBird: '🐣 Early Bird',
  faq: 'Foire aux questions',
  instructor: 'Votre formateur',
  joinWaitlist: "Rejoindre la liste d'attente",
  lastMinute: '⏰ Last Minute',
  priceStartsAt: 'à partir de',
  program: 'Programme',
  requiredKnowledge: 'Prérequis',
  testimonials: 'Retour des participants',
  whatYouWillLearn: 'Ce que vous apprendrez',
};

export const TRAINING_LABELS: Record<
  TrainingLanguage,
  typeof TRAINING_LABELS_EN
> = {
  en: TRAINING_LABELS_EN,
  fr: TRAINING_LABELS_FR,
};
