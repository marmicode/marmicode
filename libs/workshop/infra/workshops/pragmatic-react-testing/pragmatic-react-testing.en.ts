import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './pragmatic-react-testing.webp';
import thumbnailUri from './pragmatic-react-testing-thumbnail.webp';

export const pragmaticReactTestingFullCourseEn = createWorkshop({
  id: 'pragmatic-react-testing',
  title: 'Pragmatic React Testing Workshop',
  shortTitle: 'Pragmatic React Testing',
  type: 'full',
  subheading: `Three days to turn testing chaos into a well-seasoned strategy.
Learn to build tests that survive refactors, migrations, and deadlines.`,
  pictureAltText:
    'Younes in apron holding a purple cooking pot overflowing with React, Vitest, Playwright, and Testronaut logos in a kitchen setting.',
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/BFw4AUrzp3LkRLvHA',
  waitlist: {
    url: 'https://forms.gle/ZxCFYeRq73epEyVA6',
    nextSessionMonth: '2026-09',
  },
  lumaTag: 'react-testing',
  description: `
There are two ways to keep a product stable: **never touch it — or cook up a solid testing strategy.**

So… how’s yours holding up?

* Refactor something and watch the tests boil over?  
* Maintaining mocks feels like duct tape meets rocket science?  
* Still chasing 100% coverage while bugs keep crawling through?  
* End-to-end tests looked tasty at first — until flakiness and slowness caused indigestion?  
* As release day nears, you skip tests and serve it raw — fingers crossed hoping no one gets burned?

If any of that hits close to home, this workshop is your way out of the fire.

We’ll stop by the market for key ingredients such as **Fakes**, **Object Mothers**, **Gloves**, **Vitest**, **Vitest Browser Mode**, **Testronaut** for Playwright Component Testing, **Playwright** for end-to-end testing, and **WallabyJS** for TDD.

Then, back to the kitchen, we’ll prepare a complete, low-maintenance testing menu that matures over three days. You’ll learn how to:

* Write maintainable, human-readable tests that **survive refactors and migrations**.  
* Master all flavors of **TDD** — from Progressive to Timeboxed.  
* Test **async code**, **effects**, and **hooks** (such as Tanstack's React Query) with confidence.  
* Build and use your own **Page Objects** and **Gloves** for resilient UI interaction.  
* Detect **visual regressions** before your users do.  
* Write fast, reliable **end-to-end tests with Playwright** — and know exactly when to reach for e2e vs. component tests.  
* Design a **pragmatic testing strategy** that scales across teams, and pays off over time — not just write better tests.  
* Adapt your strategy to **AI-assisted development** — and know when tests act as a safety net for humans vs. a feedback loop for agents.  
* Turn your test suite into the **strongest harness** for efficient AI-assisted development — not a tax you pay around it.

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
    `React core concepts (e.g. components, props, state, hooks, context)`,
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
        'Leverage the best of Vitest, Vitest Browser Mode, and Playwright Component Testing with Testronaut.',
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
    {
      icon: 'smart_toy',
      title: 'AI-Era Testing Strategy',
      description: 'Adapt your strategy to AI-assisted development.',
    },
  ],
  testimonials: [
    {
      authorName: 'Wiemar A. W.',
      authorCompany: '4PS',
      quote:
        "As someone beginning to write 'useful' tests, I liked how simple Younes made everything seem. Not a lot of terminology, just a lot of very practical tips. His approach to test doubles provided very practical tips that I will definitely be implementing.",
    },
    {
      authorName: 'Dr Guschtel',
      quote:
        "The overview about all the options was awesome. It's great to see how Younes masters all these tools.",
    },
    {
      authorName: 'Janik S.',
      authorCompany: 'Serviceware',
      authorRole: 'Software Developer',
      quote:
        'Younes is a nice host, very easy going and well explained, well prepared examples and exercises!',
    },
    {
      authorName: 'Tomas L.',
      authorCompany: 'Rosa',
      authorRole: 'Software Engineer',
      quote:
        'Very great presentation about testing. I loved the super fast feedback loop.',
    },
    {
      authorName: 'Filip S.',
      authorCompany: 'Motorola Solutions',
      quote:
        'Great explanation of differences between mocks, stubs and fakes and how to develop a good testing strategy. The repository with useful examples of different use cases was also great.',
    },
  ],
  faqs: [
    {
      question: 'Who is this workshop for?',
      answer:
        "React developers who write tests — or want to start — and want to improve their testing practices. Whether you're dealing with flaky tests, untestable code, or no testing strategy at all — this workshop is for you.",
    },
    {
      question: "What's the experience level?",
      answer:
        'You should be comfortable with React fundamentals (components, props, state, hooks), TypeScript basics, and Git. No prior testing experience is required — we start from the ground up.',
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
      question: 'What if my company uses Jest or Mocha?',
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
          'Why Vitest instead of Jest, Mocha or Web Test Runner.',
          'Pros & cons.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: First Tests',
        items: [
          'All-you-can-eat tips & tricks for precise and maintainable tests.',
        ],
      },
      {
        title: '👨🏻‍🏫 Object Mothers',
        items: [
          'Object Mothers.',
          'Creating reusable test data.',
          'Reducing test duplication.',
        ],
      },
      {
        title: '👨🏻‍🏫 Async Testing',
        items: [
          'Async testing.',
          'Testing state updates and effects.',
          "Testing async hooks (e.g. Tanstack's React Query).",
        ],
      },
      {
        title: '💻 Hands-on Exercises: Async Testing',
        items: ['Hands-on async testing practice.'],
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
        title: '👨🏻‍🏫 Component Testing Flavors',
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
        title: '👨🏻‍🏫 React Testing Library vs. Vitest Browser Mode',
        items: ['Resilient DOM testing.', 'Testing in a real browser.'],
      },
      {
        title:
          '💻 Hands-on Exercises: React Testing Library & Vitest Browser Mode',
        items: [
          'Hands-on React Testing Library practice.',
          'Hands-on Vitest Browser Mode practice.',
        ],
      },
      {
        title: '👨🏻‍🏫 "Partial" vs. "Full" Browser Mode',
        items: ['Trade-offs between "Partial" and "Full" Browser Mode.'],
      },
      {
        title: '👨🏻‍🏫 TDD',
        items: [
          'Test-Driven Development: origin & benefits.',
          'Progressive TDD.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Testing a Custom Hook',
        items: [
          'Testing a React custom hook with the Progressive TDD approach.',
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
        title: '👨🏻‍🏫 Testing Props & Callbacks',
        items: ['Testing component props.', 'Testing component callbacks.'],
      },
      {
        title: '💻 Hands-on Exercises: Props, Callbacks & Forms',
        items: [
          'Testing Props & Callbacks based communication.',
          'Interacting with forms.',
        ],
      },
      {
        title: '👨🏻‍🏫 Time Control',
        items: [
          'Working with fake timers.',
          'Fast-forwarding time.',
          'Testing time-sensitive behavior.',
        ],
      },
      {
        title: '👨🏻‍🏫 Gloves & Page Objects',
        items: [
          'Gloves.',
          'The Page Object pattern for React components.',
          'When and how to use them.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Gloves & Page Objects',
        items: ['Using a Page Object.', 'Implementing a Page Object.'],
      },
      {
        title: '👨🏻‍🏫 Router Testing',
        items: [
          'Testing routing logic.',
          'Testing data loaders and protected routes.',
          'Testing navigation flows.',
        ],
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
        title: '👨🏻‍🏫 Building a Pragmatic Testing Strategy',
        items: [
          'Goals of a testing strategy.',
          'Choosing what to test and how.',
          'Evaluating a testing strategy.',
          'Introducing testing in a legacy codebase.',
        ],
      },
      {
        title: '👨🏻‍🏫 Testing Strategy in the AI-Assisted Era',
        items: [
          "What changes — and what doesn't — when agents write the code or the tests.",
          'Tests as a feedback loop for the agent vs. tests as a safety net for humans — and why these two roles pull the same suite in different directions.',
          'The new pains of AI-assisted development: Cognitive Debt, Review Fatigue, and Context Switching Tax — and how a solid testing strategy keeps them in check.',
          'What and when to choose: Vibe Coding vs. Spec-Driven Development vs. Charted Coding.',
        ],
      },
    ],
  },
});
