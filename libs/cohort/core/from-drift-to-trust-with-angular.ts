import { cohortRouterHelper } from '@marmicode/shared/router-helpers';
import { createCohort } from './cohort';
import pictureUri from './from-drift-to-trust-with-angular.webp';

export const FROM_DRIFT_TO_TRUST_WITH_ANGULAR = createCohort({
  id: cohortRouterHelper.FROM_DRIFT_TO_TRUST_WITH_ANGULAR_ID,
  title: 'From Drift to Trust: a 6-week cohort for Angular developers',
  shortTitle: 'From Drift to Trust',
  location: 'online',
  nextCohort: 'Early 2027',
  /* @todo replace with the cohort's own picture: this is the Charted Coding one. */
  pictureUri,
  pictureAltText:
    'Visual metaphor for charted AI-assisted development: a clear path or map guiding collaboration between a developer and an AI assistant.',
  offer: {
    type: 'early-bird',
    price: 1570,
    originalPrice: 1870,
  },
  subheading: `Ship AI-written Angular code you can trust.
Six weeks to build the tests, the harness
and the team practices that keep your agents on course.`,
  waitlist: {
    /* Google Form "From Drift to Trust with Angular - English - Waitlist". */
    url: 'https://docs.google.com/forms/d/1rQfN5CjQnxDJs6yoSKVMahPOVeYEX9DjDC7vEeRB-eU/viewform',
  },
  language: 'en',
  description: `
Coding agents write Angular code faster than any team can review it. The code is almost right, the tests are green because the agent edited them until they passed, and you either review every line or merge on faith. **That is drift.**

This cohort is six weeks to replace it with **trust you can explain**: tests the agent can't game, a harness it can't quietly bypass, changes organized in small charted steps so you can focus on what matters, and a team habit of learning from every agent session.

**The format: a course, a live session every week, and a community.**

- **Six live sessions**: one a week, three hours, hands-on. 3 pm to 6 pm Central European Time, which is 9 am to noon US Eastern. You leave each one with something to apply to your own code.
- **The video course**: [Pragmatic Angular Testing](https://courses.marmicode.io) is included: 53 lessons, 4.5 hours, with exercises, a tutor and solutions. You watch the testing fundamentals before week 1, so live time goes to building the whole workflow around your agent: tests, harness, evals and team rollout.
- **A private Discord**: I'm there between sessions to answer your questions, and you compare notes with the rest of the cohort.
`,
  benefits: [
    {
      icon: 'theater_comedy',
      title: 'Tests That Survive Change',
      description:
        'One change, and the agent rewrites dozens of tests to get back to green. With fakes over mocks, tests change only when the behavior does.',
    },
    {
      icon: 'fact_check',
      title: "Tests Agents Can't Game",
      description:
        'The agent edits the test until it passes. Precise assertions, and contracts that keep the fakes honest, put an end to that.',
    },
    {
      icon: 'visibility',
      title: 'Runtime Truth',
      description:
        'The agent guesses at bugs from the source code, or scatters console.log calls and goes in circles. Teach it to analyze runtime values and the real state of your app instead.',
    },
    {
      icon: 'route',
      title: 'Small Charted Steps',
      description:
        'You review every line, or you merge on faith. Small charted steps, each with a precise intent, let you review what matters.',
    },
    {
      icon: 'rule',
      title: 'Skills You Evaluate',
      description:
        'A prompt tweak works until the next model update. Evaluate your skills so you know the fix holds, and drop a skill once it stops helping.',
    },
    {
      icon: 'groups',
      title: 'A Team That Learns Once',
      description:
        'Every developer on the team types the same correction. Review your agent sessions as a team and fix the pattern once.',
    },
  ],
  agenda: {
    sections: [
      {
        title: "🧪 Week 1: Tests Agents Can't Cheat",
        items: [
          'Why almost-right code erodes trust, and what a test must do to stop it.',
          'A test strategy for agent-written code: how wide each test goes, what to fake, and how a contract keeps the fake honest.',
          'You leave with a contract-tested fake, and a test strategy for one feature of your own app.',
        ],
      },
      {
        title: '👀 Week 2: Give the Agent Eyes',
        items: [
          'Hand the agent your testing judgment as a skill, then compare its tests with yours.',
          'Let it inspect runtime values in the running test instead of guessing from the source.',
          'You leave with an agent that writes tests the way you would, and checks the runtime before it proposes a fix.',
        ],
      },
      {
        title: '🧭 Week 3: The Charted Coding Cycle',
        items: [
          'Write a design doc with the agent, split it into small PRs, then go scaffold, red, green.',
          'Each step has a precise intent, so you steer while the change is still small instead of untangling one big diff at the end.',
          'You leave with a design doc and a first merged PR for a real feature.',
        ],
      },
      {
        title: '⚓ Week 4: The Harness',
        items: [
          "Back pressure and guardrails the agent can't quietly bypass.",
          'The agent catches its own mistakes before it hands control back to you.',
          'You leave with checks wired into your agent that run on every change, including your architecture boundaries.',
        ],
      },
      {
        title: '🔬 Week 5: Proving It Holds',
        items: [
          "Extract your team's agent sessions and analyze where the trajectories drifted.",
          'Turn the patterns into skills, then evaluate them so the fix survives the next model update.',
          'You leave with a repeatable retrospective on your agent sessions, and one skill with an eval behind it.',
        ],
      },
      {
        title: '🔁 Week 6: The Charted Loop',
        items: [
          'Let the agent run a whole PR on its own, with a loop that knows when it is done and when it is stuck.',
          'Get back a PR whose commits tell the story, so you review intents instead of a wall of diff, then plan the rollout to your team.',
          'You leave with a loop you can run unattended, and a rollout plan for your team.',
        ],
      },
    ],
  },
  requiredSkills: [
    'Comfortable with Angular and TypeScript',
    'A coding agent you already use at work (Claude Code, Cursor, Copilot or similar)',
    'No testing experience required: the video course starts from zero',
  ],
  faqs: [
    {
      question: 'Who is this cohort for?',
      answer:
        'Angular teams already working with an agent: developers and tech leads using Claude Code, Cursor, Copilot or similar; teams whose review queue grew faster than their trust; and developers who want to run agents without babysitting every step.',
    },
    {
      question: 'When does it start?',
      answer:
        'The first cohort is planned for early 2027. The dates are not confirmed yet. Join the waitlist to be the first to know.',
    },
    {
      question: 'What time are the sessions?',
      answer: '3 pm to 6 pm Central European Time, 9 am to noon US Eastern.',
    },
    {
      question: 'How much time does it take each week?',
      answer:
        'Three hours live, plus practice on your own code. Plan for the 4.5 hours of video course before week 1.',
    },
    {
      question: 'Can I join with my team?',
      answer:
        'Yes. Weeks 5 and 6 are built around team practices, so they work best with at least one teammate.',
    },
    {
      question: 'Is the waitlist a commitment?',
      answer: 'No. You only receive an email when the dates are confirmed.',
    },
  ],
  callToAction: {
    title: 'Get on the list.',
    description:
      'Join the waitlist to be the first to know when the dates are confirmed. It is not a commitment.',
  },
});
