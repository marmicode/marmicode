import { createWorkshop } from '../workshop';
import pictureUri from './pragmatic-angular-testing.png';

export const pragmaticAngularTesting = createWorkshop({
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
    `Git fundamentals (e.g. cloning, resetting local changes, switching branches)`,
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
      icon: 'rocket',
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
      icon: 'theater_comedy',
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
    sections: [
      {
        title: '💻 Hands-on Exercise: First Test',
        items: [
          "Let's write our first test by instinct — then dissect what works and what doesn't.",
        ],
      },
      {
        title: '👨🏻‍🏫 The Testing Pain',
        items: [
          'Developers hate testing: Why, and how do we fix that?',
          'The Development Time Perception Bias.',
          "What's wrong with Unit vs. Integration taxonomy?",
          'Narrow vs. Wide.',
        ],
      },
      {
        title: '👨🏻‍🏫 Vitest',
        items: [
          'Why Vitest?',
          'Pros, cons, and the future.',
          'Migration path from Karma or Jest.',
        ],
      },
      {
        title: '👨🏻‍🏫 Component Testing',
        items: [
          'Isolated vs. Shallow vs. Integration.',
          'TestBed vs. Testing Library: What to pick from each?',
        ],
      },
      {
        title: '💻 Hands-on Exercises: TDD & Component Testing',
        items: [
          'Progressive Test-Driven Development.',
          'All-you-can-eat tips & tricks for precise and maintainable tests.',
          'Future-proof testing with DOM-distancing and Gloves.',
          'Zoneless-ready testing.',
          'Debugging techniques.',
        ],
      },
      {
        title: '👨🏻‍🏫 Test Doubles & "Mocking"',
        items: [
          'When, why, how, and where to "mock".',
          'Fake it till you mock it: picking the right Test Double.',
          'Type-safe and maintainable doubles.',
          'High confidence with contract testing.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Test Doubles & "Mocking"',
        items: ['Narrowing down tests with Fakes.'],
      },
      {
        title: '👨🏻‍🏫 Playwright Component Testing with Testronaut',
        items: [
          'How is Testronaut different from anything else?',
          'Component Testing with Testronaut.',
          'Using test doubles.',
          'Debugging.',
          'Visual regression testing that scales.',
        ],
      },
      {
        title: '👨🏻‍🏫 Building your Pragmatic Testing Strategy',
        items: [
          'What to test?',
          'Which tool to use?',
          'What is the right size for a System Under Test?',
          'Which strategy for legacy code?',
        ],
      },
      {
        title: '🙋 Q&A',
        items: [],
      },
    ],
  },
});
