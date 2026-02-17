import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './pragmatic-angular-testing.webp';
import thumbnailUri from './pragmatic-angular-testing-thumbnail.webp';

export const pragmaticAngularTestingFullCourse = createWorkshop({
  id: 'pragmatic-angular-testing-full-course',
  title: 'Pragmatic Angular Testing Workshop',
  type: 'full',
  subheading: `Three days to turn your testing chaos into a well-seasoned strategy.
Learn to build tests that survive refactors, migrations, and deadlines.`,
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/TEp9DTM6pHiSFRPY9',
  lumaTag: 'angular-testing',
  description: `
There are two ways to keep a product stable:  
**never touch it — or cook up a solid testing strategy.**

So… how’s yours holding up?

* Refactor something and watch the tests boil over?  
* Maintaining mocks feels like duct tape meets rocket science?  
* Still chasing 100% coverage while bugs keep crawling through?  
* End-to-end tests looked tasty at first — until flakiness and slowness caused indigestion?  
* As release day nears, you skip tests and serve it raw — fingers crossed hoping no one gets burned?

If any of that hits close to home, this workshop is your way out of the fire.

We’ll stop by the market for key ingredients such as **Fakes, Object Mothers, Gloves, Vitest, Testing Library, Angular CDK Harness, Playwright Component Testing with Testronaut, and Playwright for end-to-end testing**.

Then, back to the kitchen, we’ll prepare a complete, low-maintenance testing menu that matures over three days. You’ll learn how to:

* Write maintainable, human-readable tests that **survive refactors and migrations**.  
* Prepare your suite for tomorrow’s Angular: **Zoneless-ready** and **Signal-friendly**.  
* Master all flavors of **TDD** — from Progressive to Timeboxed.  
* Test **async code** and **effects** with confidence.  
* Build and use your own **test harnesses** and **Gloves** for resilient UI interaction.  
* Detect **visual regressions** before your users do.  
* Write fast, reliable **end-to-end tests with Playwright** — and know exactly when to reach for e2e vs. component tests.  
* Design a **pragmatic testing strategy** that scales across teams, and pays off over time — not just write better tests.

Across these three days, you won’t just learn recipes — you’ll refine your testing instincts, challenge habits, and leave with a testing culture you can scale.

Small group, plenty of hands-on work, and direct coaching to help you apply each technique to your own codebase.

**No dogma. No silver bullets.** Just three days of practical, battle-tested techniques to help you cook with confidence — and serve code that stays fresh long after the workshop ends.
`,
  offer: {
    type: 'early-bird',
    price: 970,
    originalPrice: 1270,
  },
  requiredSkills: [
    `Angular core concepts (e.g. components, inputs/outputs, services)`,
    `TypeScript fundamentals (e.g. types, interfaces, basic generics)`,
    `Git fundamentals (e.g. cloning, resetting local changes, switching branches)`,
  ],
  benefits: [
    {
      icon: 'psychology',
      title: 'Test-Driven Development',
      description: 'From specs to refactors, learn the TDD mindset.',
    },
    {
      icon: 'build',
      title: 'Modern Testing Tools',
      description:
        'Leverage the best of Vitest and Playwright Component Testing with Testronaut.',
    },
    {
      icon: 'visibility',
      title: 'Readable and Maintainable Tests',
      description: 'Tests that tell stories, not implementation details.',
    },
    {
      icon: 'rocket',
      title: 'Future-Proof Your Tests',
      description:
        'Craft tests that survive migrations and refactorings with minimal changes.',
    },
    {
      icon: 'theater_comedy',
      title: 'Mocking Made Easy',
      description:
        'Master Fakes and Object Mothers to simplify "mocking" and avoid common pitfalls.',
    },
    {
      icon: 'language',
      title: 'End-to-End Testing',
      description:
        "Write reliable e2e tests with Playwright and know when they're the right tool for the job.",
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
        title: '👨🏻‍🏫 Introduction to Testing',
        items: [
          'Why test.',
          'What to expect from a test.',
          'The Development Time Perception Bias.',
          'The different types of tests: Narrow & Wide vs Unit & Integration.',
        ],
      },
      {
        title: '👨🏻‍🏫 Vitest',
        items: [
          'Why Vitest instead of Karma, Jest or Web Test Runner.',
          'Pros & cons.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: First Tests',
        items: [
          'Test-Driven Development: origin & benefits.',
          'Progressive TDD.',
          'All-you-can-eat tips & tricks for precise and maintainable tests.',
          'Object Mothers.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Testing an Angular Service',
        items: [
          'Testing an Angular service with the Progressive TDD approach.',
          'Debugging with Vitest.',
        ],
      },
      {
        title: '👨🏻‍🏫 Timeboxed TDD & TCR',
        items: [
          'Refactor vs. Restructure: back to definitions.',
          'Timeboxed TDD.',
          'Limbo.',
          'TCR : Test && Commit || Revert.',
        ],
      },
      {
        title: '👨🏻‍🏫 Async Testing',
        items: [
          'Async testing.',
          'Testing observables.',
          'Testing effects.',
          'Fake timers.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Async Testing',
        items: ['Hands-on async testing practice.'],
      },
      {
        title: '👨🏻‍🏫 Component Testing',
        items: [
          'Testing a component.',
          'The different types of component tests: Isolated vs. Shallow vs. Integration.',
          'Interacting with the DOM.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Component Testing',
        items: [
          'Component isolated testing.',
          'Component shallow testing.',
          'Component integration testing.',
        ],
      },
      {
        title: '👨🏻‍🏫 Test Doubles & "Mocking"',
        items: [
          'Mocks vs Dummies vs Spies vs Stubs vs Fakes.',
          'Fake it till you Mock it!',
          'Type-safe testing.',
          'Contract testing fakes.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Test Doubles & "Mocking"',
        items: ['Hands-on test doubles practice.'],
      },
      {
        title: '💻 Hands-on Exercises: More Component Testing',
        items: [
          'Testing Inputs & Outputs based communication.',
          'Interacting with forms.',
        ],
      },
      {
        title: '👨🏻‍🏫 Angular Testing Library vs. Vitest Browser Mode',
        items: ['Resilient DOM testing.'],
      },
      {
        title:
          '💻 Hands-on Exercises: Angular Testing Library vs. Vitest Browser Mode',
        items: [
          'Hands-on Angular Testing Library practice.',
          'Hands-on Vitest Browser Mode practice.',
        ],
      },
      {
        title: '👨🏻‍🏫 Gloves & Angular CDK Test Harness',
        items: [
          'Gloves.',
          'The story behind Angular CDK Test Harness.',
          'When and how to use it.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Test Harness',
        items: ['Using a test harness.', 'Implementing a test harness.'],
      },
      {
        title: '👨🏻‍🏫 End-to-End Testing with Playwright',
        items: [
          'When to use e2e tests vs. component tests.',
          'Writing fast, reliable end-to-end tests with Playwright.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: End-to-End Testing with Playwright',
        items: ['Hands-on end-to-end testing with Playwright.'],
      },
      {
        title: '👨🏻‍🏫 Playwright Component Testing with Testronaut',
        items: [
          'Beyond the limits of browserless testing.',
          'Playwright Component Testing with Testronaut.',
          'Debugging with Playwright and Testronaut.',
        ],
      },
      {
        title:
          '💻 Hands-on Exercises: Playwright Component Testing with Testronaut',
        items: ['Hands-on Playwright Component Testing with Testronaut.'],
      },
      {
        title: '👨🏻‍🏫 Visual Regression Testing',
        items: [
          'Testing the presentation.',
          'Visual Regression Testing: Magic, Gotchas, Recommendations, and Strategies.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Visual Regression Testing',
        items: ['Detecting visual regressions with Playwright and Testronaut.'],
      },
      {
        title: '👨🏻‍🏫 Defining a Pragmatic Testing Strategy',
        items: [
          'Goals of a testing strategy.',
          'Choosing what to test and how.',
          'Evaluating a testing strategy.',
          'Introducing testing in a legacy codebase.',
        ],
      },
    ],
  },
});
