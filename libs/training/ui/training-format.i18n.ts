import { TrainingFormat, TrainingLanguage } from '@marmicode/training/core';

export const TRAINING_FORMAT_EMOJIS: Record<TrainingFormat, string> = {
  'video-course': '🎬',
  cohort: '👥',
  workshop: '🧑‍🍳',
};

export const TRAINING_FORMAT_LABELS: Record<
  TrainingLanguage,
  Record<TrainingFormat, string>
> = {
  en: {
    'video-course': 'Video course',
    cohort: 'Cohort',
    workshop: 'Workshop',
  },
  fr: {
    'video-course': 'Cours vidéo',
    cohort: 'Cohorte',
    workshop: 'Formation',
  },
};
