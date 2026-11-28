import { TrainingLanguage } from '@marmicode/training/core';

const TRAINING_LABELS_EN = {
  atAGlance: 'at a glance',
  callToActionTitle: "Dinner's ready!",
  earlyBird: '🐣 Early Bird',
  faq: 'Frequently Asked Questions',
  joinWaitlist: 'Join Waitlist',
  lastMinute: '⏰ Last Minute',
  program: 'Program',
  requiredKnowledgeEyebrow: 'required knowledge',
  testimonials: 'What they say',
  whatYouWillLearn: 'What you will learn',
};

const TRAINING_LABELS_FR: typeof TRAINING_LABELS_EN = {
  atAGlance: 'en bref',
  callToActionTitle: 'À table !',
  earlyBird: '🐣 Early Bird',
  faq: 'Foire aux questions',
  joinWaitlist: "Rejoindre la liste d'attente",
  lastMinute: '⏰ Last Minute',
  program: 'Programme',
  requiredKnowledgeEyebrow: 'prérequis',
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
