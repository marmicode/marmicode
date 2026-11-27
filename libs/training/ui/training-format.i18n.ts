import { TrainingFormat, TrainingLanguage } from '@marmicode/training/core';

export const TRAINING_FORMAT_EMOJIS: Record<TrainingFormat, string> = {
  'video-course': '🎬',
  cohort: '👥',
  workshop: '🧑‍🍳',
};

/**
 * One line explaining each format.
 */
export const TRAINING_FORMAT_DESCRIPTIONS: Record<
  TrainingLanguage,
  Record<TrainingFormat, string>
> = {
  en: {
    'video-course':
      'Self-paced: watch the lessons and do the exercises whenever you want.',
    cohort:
      'A multi-week program with a group: a live session every week, a video course with assignments, and a private community.',
    workshop:
      'Live and hands-on, over one to three days. Public sessions, or in-house for your team.',
  },
  fr: {
    'video-course':
      'À votre rythme : regardez les leçons et faites les exercices quand vous le souhaitez.',
    cohort:
      'Un programme de plusieurs semaines en groupe : une session live chaque semaine, un cours vidéo avec des exercices, et une communauté privée.',
    workshop:
      'En direct et pratique, sur un à trois jours. Sessions publiques, ou en intra pour votre équipe.',
  },
};
