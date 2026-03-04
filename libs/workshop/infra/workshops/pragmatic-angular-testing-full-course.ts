import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './pragmatic-angular-testing.webp';
import thumbnailUri from './pragmatic-angular-testing-thumbnail.webp';

export const pragmaticAngularTestingFullCourse = createWorkshop({
  id: 'pragmatic-angular-testing-full-course',
  title: 'Pragmatic Angular Testing Workshop',
  shortTitle: 'Pragmatic Angular Testing',
  type: 'full',
  subheading: `Three days to turn your testing chaos into a well-seasoned strategy.
Learn to build tests that survive refactors, migrations, and deadlines.`,
  pictureAltText:
    'Younes in apron holding a purple cooking pot overflowing with Angular, Vitest, Playwright, and Testronaut logos in a kitchen setting.',
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/TEp9DTM6pHiSFRPY9',
  lumaTag: 'angular-testing',
  description: `
There are two ways to keep a product stable: **never touch it — or cook up a solid testing strategy.**

So… how’s yours holding up?

* Refactor something and watch the tests boil over?  
* Maintaining mocks feels like duct tape meets rocket science?  
* Still chasing 100% coverage while bugs keep crawling through?  
* End-to-end tests looked tasty at first — until flakiness and slowness caused indigestion?  
* As release day nears, you skip tests and serve it raw — fingers crossed hoping no one gets burned?

If any of that hits close to home, this workshop is your way out of the fire.

We’ll stop by the market for key ingredients such as **Fakes**, **Object Mothers**, **Gloves**, **Vitest**, **Testronaut** for Playwright Component Testing, **Playwright** for end-to-end testing, and **WallabyJS** for TDD.

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

Whether you or your AI agents write the tests, you'll need the instincts to tell if they're meaningful or just getting in the way — and a clear testing strategy to guide both your team and your tools.

Small group, plenty of hands-on work, and direct coaching to help you apply each technique to your own codebase.

**No dogma. No silver bullets.** Just three days of practical, battle-tested techniques to help you cook with confidence — and serve code that stays fresh long after the workshop ends.
`,
  offer: {
    type: 'early-bird',
    price: 970,
    originalPrice: 1270,
  },
  language: 'en',
  requiredSkills: [
    `Angular core concepts (e.g. components, inputs/outputs, services, signals, etc.)`,
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
  faqs: [
    {
      question: 'Who is this workshop for?',
      answer:
        "Angular developers who write tests — or want to start — and want to improve their testing practices. Whether you're dealing with flaky tests, untestable code, or no testing strategy at all — this workshop is for you.",
    },
    {
      question: "What's the experience level?",
      answer:
        'You should be comfortable with Angular fundamentals (components, services, inputs/outputs), TypeScript basics, and Git. No prior testing experience is required — we start from the ground up.',
    },
    {
      question: 'What tools do I need?',
      answer:
        'A laptop with Node.js, Git, and your favorite IDE. Detailed setup instructions are sent a few days before the workshop.',
    },
    {
      question: 'Is it hands-on?',
      answer:
        "Very. You'll alternate between short theory sessions and practical exercises throughout the three days. Small groups ensure direct coaching and feedback.",
    },
    {
      question: 'What if my company uses Jest or Karma?',
      answer:
        "The principles and strategies you'll learn apply regardless of your test runner. That said, we use Vitest in the exercises — and you might not want to go back.",
    },
    {
      question: 'Can my company fund this?',
      answer: 'Yes. Contact me for a quote and administrative details.',
    },
    {
      question:
        "What's the difference between booking a session and requesting a custom session?",
      answer:
        '"Book a Session" lets you join a scheduled cohort. "Custom Session" is for companies who want a private, in-house workshop — with optional adjustments to content, duration, or focus areas.',
    },
    {
      question: 'Is there a money-back guarantee?',
      answer:
        "If the workshop doesn't meet your expectations, reach out within 7 days and we'll work it out.",
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
