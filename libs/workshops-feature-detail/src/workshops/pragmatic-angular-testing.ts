import { createWorkshop } from '../workshop';
import pictureUri from './pragmatic-angular-testing.png';

export const pragmaticAngularTesting = createWorkshop(
  createWorkshop({
    title: 'Pragmatic Angular Testing Workshop',
    type: 'tapas',
    subheading: `Tired of whack-a-mole bugs, boring manual tests, and fragile suites? 
Let's cook fast, reliable tests that actually help you ship.`,
    pictureUri,
    duration: 1,
    offer: {
      type: 'early-bird',
      price: 240,
      originalPrice: 360,
    },
    requiredSkills: [
      `Angular core concepts (e.g. components, inputs/outputs, services)`,
      `TypeScript fundamentals (e.g. types, interfaces, basic generics)`,
      `Git fundamentals (e.g. cloning, resetting, switching branches)`,
    ],
    benefits: [
      {
        icon: 'visibility',
        title: 'Readable & Maintainable Tests',
        description:
          'Learn how to write tests that are easy to read, understand, and maintain over time.',
      },
      {
        icon: 'psychology',
        title: 'Behavior-Focused Testing',
        description:
          'Write tests that validate user behavior, not implementation details.',
      },
      {
        icon: 'autorenew',
        title: 'Future-Proof Your Tests',
        description:
          'Craft tests that survive migrations and refactorings with minimal changes.',
      },
      {
        icon: 'straighten',
        title: 'Right-Sized Testing',
        description:
          'Discover how to choose the appropriate test size for every situation.',
      },
      {
        icon: 'science',
        title: 'Mocking Made Easy',
        description:
          'Master Fakes and Object Mothers to simplify "mocking" and avoid common pitfalls.',
      },
      {
        icon: 'restaurant',
        title: 'Pragmatic Testing Buffet',
        description:
          'Enjoy a buffet of tips and tricks to help you adopt a Pragmatic Testing Strategy.',
      },
    ],
    agenda: {
      sections: [],
    },
  }),
);
