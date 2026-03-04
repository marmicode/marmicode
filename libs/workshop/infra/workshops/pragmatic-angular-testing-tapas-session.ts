import { createWorkshop } from '@marmicode/workshop/core';
import thumbnailUri from './pragmatic-angular-testing-thumbnail.webp';
import pictureUri from './pragmatic-angular-testing.webp';

export const pragmaticAngularTestingTapasSession = createWorkshop({
  id: 'pragmatic-angular-testing-tapas-session',
  title: 'Pragmatic Angular Testing Workshop',
  type: 'tapas',
  subheading: `Tired of whack-a-mole bugs, boring manual tests, and fragile suites?
Let's cook fast, reliable tests that actually help you ship.`,
  pictureAltText:
    'Younes in apron holding a purple cooking pot overflowing with Angular, Vitest, Playwright, and Testronaut logos in a kitchen setting.',
  pictureUri,
  thumbnailUri,
  duration: 1,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/scCAxEmgP4LmnULo6',
  lumaTag: 'angular-testing-tapas',
  description: `
Two ways to keep your app stable:
**Leave it untouched — or season it with a solid testing strategy.**

How's your testing strategy holding up?
- Does each refactor send half your tests into meltdown?
- Maintaining mocks turns into a nightmare?
- Got 100% coverage but bugs still sneak through the cracks?
- Thought end-to-end would be the main course — but ended up chewing on flakiness and wait times?
- As release dates approach, you skip tests and serve it raw, hoping nobody gets food poisoning?

If that sounds familiar, this workshop is your kitchen rescue plan.

We'll shop for the good stuff: **Fakes, Object Mothers, Gloves, Vitest, Testing Library, Playwright Component Testing** — and learn when and why to reach for each.

Once we're back in the kitchen, we'll cook **high-confidence, low-maintenance** tests that:

- Help you develop faster.
- Catch regressions before your users do.
- **Survive the heat of refactors** and all sorts of **migrations** — including Observables → Signals, or whatever the future holds.
- Run fast enough to guide you while you code.
- Are ready for a **Zoneless future**.

No dogma. No silver bullets. Just pragmatic Angular testing skills to help you **ship with peace of mind**.
`,
  offer: {
    type: 'early-bird',
    price: 370,
    originalPrice: 470,
  },
  language: 'en',
  requiredSkills: [
    `Angular core concepts (e.g. components, inputs/outputs, services)`,
    `TypeScript fundamentals (e.g. types, interfaces, basic generics)`,
    `Git fundamentals (e.g. cloning, resetting local changes, switching branches)`,
  ],
  benefits: [
    {
      icon: 'build',
      title: 'Modern Testing Tools',
      description:
        'Leverage the best of Vitest and Playwright Component Testing.',
    },
    {
      icon: 'visibility',
      title: 'Readable & Maintainable Tests',
      description:
        'Learn how to write tests that are easy to read, understand, and maintain over time.',
    },
    {
      icon: 'rocket',
      title: 'Future-Proof Your Tests',
      description:
        'Craft tests that survive migrations and refactorings with minimal changes.',
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
        title: '👨🏻‍🏫 Vitest & Vitest Browser Mode',
        items: [
          'Why Vitest?',
          'Pros, cons, and the future.',
          'Migration path from Karma or Jest.',
          'Vitest Browser Mode.',
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
