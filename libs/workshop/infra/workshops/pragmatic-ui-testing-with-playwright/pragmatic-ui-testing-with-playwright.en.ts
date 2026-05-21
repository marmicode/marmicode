import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './pragmatic-ui-testing-with-playwright.webp';
import thumbnailUri from './pragmatic-ui-testing-with-playwright-thumbnail.webp';

export const pragmaticUiTestingWithPlaywrightFullCourseEn = createWorkshop({
  id: 'pragmatic-ui-testing-with-playwright',
  title: 'Pragmatic UI Testing with Playwright Workshop',
  shortTitle: 'Pragmatic UI Testing with Playwright',
  type: 'full',
  subheading: `Three days to turn UI testing chaos into a well-seasoned Playwright strategy.
Learn to build tests that survive refactors, migrations, and AI-assisted development.`,
  pictureAltText:
    'Younes in apron holding a purple cooking pot overflowing with Playwright, Angular, React, and Vue logos in a kitchen setting.',
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/J9kGUiNeDBFzdZ937',
  waitlistUrl: 'https://forms.gle/mwfc57RfQXdMdMSLA',
  lumaTag: 'pragmatic-ui-testing',
  description: `
Testing — and frontend testing in particular — is undeniably in the top 3 most complex topics in web application development.

Faced with this complexity, it's tempting to give up — but at what cost?

* Sure, you can ship an app without UI tests, but is it really faster?
* What happens to maintainability a few months — or even a few weeks — later?
* Can you refactor and deploy regularly with peace of mind as the app grows and ages in your hands?
* And what about end-to-end tests? Are they enough?

This workshop teaches **pragmatic UI testing techniques with Playwright** through hands-on exercises. You'll learn how to write tests that are **understandable, maintainable, and — most importantly — cost-effective**.

You'll learn how to:

* Implement different types of tests for your **Angular, React, VueJS, or framework-free apps with Playwright**.
* Write **maintainable, human-readable tests**.
* Integrate **Playwright with your AI agent**.
* Choose the **right type of test for the context**.
* Decouple tests from code to **lower testing and maintenance costs**.
* Test **network interactions**.
* Pick the **right scope** for your tests.
* Use **Test Harnesses** — when and how.
* Use **Playwright Component Testing** — when and how.
* Adopt a **pragmatic, cost-effective testing strategy** through plenty of best practices and tricks.

Whether you or your AI agents write the tests, you'll need the instincts to tell if they're meaningful or just getting in the way — and a clear testing strategy to guide both your team and your tools.

Small group, plenty of hands-on work, and direct coaching to help you apply each technique to your own codebase.

**No dogma. No silver bullets.** Just three days of practical, battle-tested techniques to help you ship UI with confidence.
`,
  offer: {
    type: 'early-bird',
    price: 970,
    originalPrice: 1270,
  },
  language: 'en',
  requiredSkills: [
    `Web development knowledge: JavaScript & TypeScript fundamentals`,
    `Curiosity about web technologies`,
    `Git fundamentals (e.g. cloning, resetting local changes, switching branches)`,
  ],
  benefits: [
    {
      icon: 'language',
      title: 'Framework-Agnostic UI Testing',
      description:
        'Test Angular, React, Vue, or framework-free apps with the same Playwright toolbox.',
    },
    {
      icon: 'visibility',
      title: 'Readable and Maintainable Tests',
      description:
        'Write tests that tell stories — not implementation details — and survive refactors.',
    },
    {
      icon: 'smart_toy',
      title: 'AI-Assisted Testing',
      description:
        'Plug Playwright into your AI agent for reproduction, specification, and self-healing tests.',
    },
    {
      icon: 'hub',
      title: 'Network, Auth & Time Control',
      description:
        'Master request interception, auth setup, and Playwright Clock for fast, reliable tests.',
    },
    {
      icon: 'science',
      title: 'Test Harnesses & Component Testing',
      description:
        'Learn when and how to use Gloves, Test Harnesses, and Playwright Component Testing.',
    },
    {
      icon: 'photo_camera',
      title: 'Visual Regression Testing',
      description: 'Detect visual regressions without pain.',
    },
    {
      icon: 'restaurant',
      title: 'Pragmatic Testing Buffet',
      description:
        'Enjoy a buffet of tips and tricks to adopt a scalable, cost-effective UI testing strategy.',
    },
  ],
  faqs: [
    {
      question: 'Who is this workshop for?',
      answer:
        "Web developers (Angular, React, Vue, or framework-free) who want to write effective, readable, and cost-effective UI tests. Lead developers and tech leads framing their team's testing strategy. Architects and CTOs looking to industrialize frontend testing without sacrificing delivery velocity. Teams stuck with flaky or unmanageable tests who want a structured, scalable approach that fits AI-assisted development.",
    },
    {
      question: "What's the experience level?",
      answer:
        'You should be comfortable with JavaScript and TypeScript fundamentals. No prior Playwright or testing experience is required — we start from the ground up.',
    },
    {
      question: 'What tools do I need?',
      answer:
        'A laptop with internet access, microphone, webcam, an up-to-date browser, and installation rights. Detailed setup instructions are sent a few days before the workshop.',
    },
    {
      question: 'Is it hands-on?',
      answer:
        'Very. You will alternate between short theory sessions and practical exercises on a single use case throughout the three days. Small groups ensure direct coaching and feedback.',
    },
    {
      question: 'Do I need to use a specific frontend framework?',
      answer:
        'No. The techniques apply to Angular, React, Vue, and framework-free apps. Exercises focus on Playwright patterns that transfer across stacks.',
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
          'The different types of tests.',
          'Testing strategies: ice cream cone, pyramid vs. honeycomb.',
        ],
      },
      {
        title: '👨🏻‍🏫 Playwright Core Features',
        items: [
          'Developer eXperience.',
          'Speed.',
          'Debuggability.',
          'Retry-ability.',
          'Consistency and stability.',
          'AI-Assisted Testing.',
        ],
      },
      {
        title: '👨🏻‍🏫 First Test',
        items: ['Setting up Playwright.', 'Setting up Playwright with Nx.'],
      },
      {
        title: '💻 Hands-on Exercises: First Test',
        items: ['Implementing and running a first Playwright test.'],
      },
      {
        title: '👨🏻‍🏫 Playwright Fundamentals',
        items: ['Fixtures.', 'Assertions.', 'Organizing tests.'],
      },
      {
        title: '💻 Hands-on Exercises: Interacting with the DOM and Forms',
        items: ['Interacting with the DOM.', 'Interacting with forms.'],
      },
      {
        title: '👨🏻‍🏫 Locators',
        items: [
          'The locator philosophy: web-first, auto-waiting, retry-ability.',
          'Recommended locators and priority: `getByRole`, `getByLabel`, `getByText` & co.',
          'Filtering, chaining, and resolving ambiguity (`filter`, `nth`, strict mode).',
          'Accessibility and testability: why `getByRole` is more than a technical detail.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Semantic Locators',
        items: ['Rewriting CSS-driven tests with semantic locators.'],
      },
      {
        title: '👨🏻‍🏫 VSCode Extension & Recording',
        items: [
          'Installing and running tests from the IDE.',
          'Test implementation assistance and recording.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Recording',
        items: ['Recording a first test.'],
      },
      {
        title: '👨🏻‍🏫 Debugging',
        items: [
          'UI Mode and Trace Viewer: development and debugging experience.',
          'Anatomy of a trace: actions, DOM snapshots, network, console.',
          '`page.pause()`, Inspector, and VSCode breakpoints.',
          'Diagnosing flakiness via retries and traces.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Debugging Flaky Tests',
        items: ['Diagnosing a flaky test from its trace.'],
      },
      {
        title: '👨🏻‍🏫 Playwright Network Testing',
        items: [
          'Pros and cons of the different techniques.',
          'Request interception vs. sandboxes.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Network Testing',
        items: ['Intercepting requests.', 'Using a sandbox.'],
      },
      {
        title: '👨🏻‍🏫 Authentication',
        items: [
          'The cost of repeated logins.',
          'The `auth.setup.ts` pattern with project dependencies.',
          'UI vs. API authentication: trade-offs and multi-user scenarios.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Authentication Setup',
        items: ['Setting up a reusable authentication setup.'],
      },
      {
        title: '👨🏻‍🏫 Back to the Future',
        items: [
          'Fake timers and the Playwright Clock API.',
          'Use cases: debounce, polling, animations, dates.',
          'Testing without waiting.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Playing with the Clock',
        items: ['Playing with the timer.'],
      },
      {
        title: '👨🏻‍🏫 DOM Distancing & Test Harnesses',
        items: [
          'Accessibility and testability.',
          'Page objects: benefits and limits.',
          'The story behind Test Harnesses.',
          'Gloves & Test Harnesses: how they work.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Test Harnesses',
        items: ['Using test harnesses.', 'Implementing test harnesses.'],
      },
      {
        title: '👨🏻‍🏫 Playwright Component Testing',
        items: [
          'Breaking the boundaries of "isolated testing" with Playwright Component Testing.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: Playwright Component Testing',
        items: [
          'Isolating and testing a component with Playwright.',
          'Reusing the test harness.',
        ],
      },
      {
        title: '👨🏻‍🏫 Testing Interactions',
        items: ['Test Doubles: Dummies, Stubs, Spies, Mocks & Fakes.'],
      },
      {
        title: '💻 Hands-on Exercises: Test Doubles',
        items: [
          'Overriding dependencies with dependency injection and fakes.',
          'Testing props, inputs & outputs based communication.',
        ],
      },
      {
        title: '👨🏻‍🏫 Visual Regression Testing',
        items: ['Testing the presentation.', 'Detecting visual regressions.'],
      },
      {
        title: '💻 Hands-on Exercises: Visual Regression Testing',
        items: [
          'Detecting a visual regression on a component with masking of dynamic elements.',
        ],
      },
      {
        title: '👨🏻‍🏫 AI-Assisted Testing',
        items: [
          '`playwright-cli` vs Playwright MCP: which to pick so your AI agent can use Playwright.',
          'Annotated screencast: getting the agent to produce a proof video, with annotations of the elements observed on the page.',
          'The agent → test loop: exploration, reproduction, specification, fix.',
        ],
      },
      {
        title: '💻 Hands-on Exercises: AI-Assisted Testing',
        items: [
          'Having the agent reproduce a bug and generate an annotated screencast that explains it.',
          'Generating a failing test from that reproduction.',
          'Having the agent fix the bug based on the previous test.',
        ],
      },
      {
        title: '👨🏻‍🏫 Testing Pipeline',
        items: [
          'CI configuration.',
          'Reporters.',
          'Parallelization and sharding.',
        ],
      },
      {
        title: '👨🏻‍🏫 Architecture, Maintainability & Scaling',
        items: [
          'How to fight flakiness.',
          'How to design a maintainable and scalable testing strategy.',
        ],
      },
    ],
  },
});
