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
  waitlistUrl: 'https://forms.gle/gNuegturZDUvPukT6',
  lumaTag: 'angular-testing',
  sessions: [
    {
      startDate: new Date('2025-12-10'),
      endDate: new Date('2025-12-12'),
      startTime: '10:00',
      endTime: '17:00',
      timezone: 'CET',
      waitlistUrl:
        'https://docs.google.com/forms/d/e/1FAIpQLSceQ2TWdpDjPHD4W0j_EsAvcOi4kr-NRmFebiJLo5zHjX-QOQ/viewform?usp=pp_url&entry.804908816=December+10%E2%80%9312,+2025+(Wed%E2%80%93Fri),+10+AM+%E2%80%93+5+PM+CET',
    },
  ],
  description: `
Testing, more specifically frontend testing, is undeniably in **the top 3 of the most complex topics** associated with Angular development.

When one is confronted with this complexity, it is tempting to give up, but at what cost? It is totally possible to **develop an application without tests but is it really faster**? What happens to **code maintainability** a few months or sometimes just weeks later? **Can we serenely refactor and deploy our apps regularly** while it is getting older and complex in our hands?

This comprehensive 3-day workshop presents, through practical exercises, pragmatic Angular testing techniques. You will **learn how to implement human-readable, maintainable, and above all profitable tests.**
`,
  offer: {
    type: 'early-bird',
    price: 970,
    originalPrice: 1200,
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
        'Leverage the best of Vitest and Playwright Component Testing.',
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
        title: '💻 First Tests',
        items: [
          'Test-Driven Development: origin & benefits.',
          'Progressive TDD.',
          'All-you-can-eat tips & tricks for precise and maintainable tests.',
          'Object Mothers.',
        ],
      },
      {
        title: '💻 Exercise: Testing an Angular Service',
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
        title: '💻 Exercise: Async Testing',
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
        title: '💻 Component Testing Exercises',
        items: [
          'Component isolated testing.',
          'Component shallow testing.',
          'Component integration testing.',
        ],
      },
      {
        title: '👨🏻‍🏫 Test Doubles',
        items: [
          'Mocks vs Dummies vs Spies vs Stubs vs Fakes.',
          'Fake it till you Mock it!',
          'Type-safe testing.',
          'Contract testing fakes.',
        ],
      },
      {
        title: '💻 Exercise: Test Doubles',
        items: ['Hands-on test doubles practice.'],
      },
      {
        title: '💻 More Component Testing',
        items: [
          'Testing Inputs & Outputs based communication.',
          'Interacting with forms.',
        ],
      },
      {
        title: '👨🏻‍🏫 Angular Testing Library',
        items: ['Resilient DOM testing.'],
      },
      {
        title: '💻 Exercise: Angular Testing Library',
        items: ['Hands-on Angular Testing Library practice.'],
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
        title: '💻 Test Harness Exercises',
        items: ['Using a test harness.', 'Implementing a test harness.'],
      },
      {
        title: '👨🏻‍🏫 UI Testing with Playwright Component Testing',
        items: [
          'Beyond the limits of browserless testing.',
          'Playwright Component Testing (CT).',
          'Debugging with Playwright CT.',
        ],
      },
      {
        title: '💻 Exercise: UI Testing with Playwright CT',
        items: ['Hands-on UI testing with Playwright CT.'],
      },
      {
        title: '👨🏻‍🏫 Visual Regression Testing',
        items: [
          'Testing the presentation.',
          'Visual Regression Testing: Magic, Gotchas, Recommendations, and Strategies.',
        ],
      },
      {
        title: '💻 Exercise: Visual Regression Testing',
        items: ['Detecting visual regressions with Playwright CT.'],
      },
      {
        title: '👨🏻‍🏫 NgRx SignalStore Testing',
        items: [
          'Testing a store.',
          'When and how to provide a test double for a store.',
        ],
      },
      {
        title: '💻 SignalStore Testing Exercises',
        items: [
          'Testing a store.',
          'Provide a test double for a store.',
          'Testing a custom store feature.',
        ],
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
