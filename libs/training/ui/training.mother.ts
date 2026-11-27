import { Training } from '@marmicode/training/core';

/**
 * Builds a training for tests: override only what the test is about.
 */
export const trainingMother = {
  withBasicInfo(title: string) {
    return createTrainingBuilder({
      id: title.toLowerCase().replaceAll(' ', '-'),
      title,
      shortTitle: title,
      location: 'online',
      description: `${title} description`,
      subheading: `${title} subheading`,
      pictureAltText: `${title} picture`,
      pictureUri: '/picture.webp',
      offer: { type: 'last-minute', price: 100 },
      language: 'en',
      requiredSkills: [],
      benefits: [],
      agenda: { sections: [] },
      faqs: [],
    });
  },
};

function createTrainingBuilder(training: Training) {
  return {
    withSubheading(subheading: string) {
      return createTrainingBuilder({ ...training, subheading });
    },
    withWaitlist(url: string) {
      return createTrainingBuilder({ ...training, waitlist: { url } });
    },
    withCallToAction(callToAction: NonNullable<Training['callToAction']>) {
      return createTrainingBuilder({ ...training, callToAction });
    },
    build(): Training {
      return training;
    },
  };
}
