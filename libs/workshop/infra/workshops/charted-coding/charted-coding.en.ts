import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './charted-coding.webp';
import thumbnailUri from './charted-coding-thumbnail.webp';

export const chartedCodingFullCourseEn = createWorkshop({
  id: 'charted-coding',
  title: 'Charted Coding: AI-Assisted Development Without the Drift',
  shortTitle: 'Charted Coding: AI-Assisted Development Without the Drift',
  type: 'full',
  subheading: `One day to move from fast-but-fragile AI coding to approaches you can sustain.
Map the landscape, chart a method your architecture can live with — then wire harnesses that keep the agents on course.`,
  pictureAltText:
    'Visual metaphor for charted AI-assisted development: a clear path or map guiding collaboration between a developer and an AI assistant.',
  pictureUri,
  thumbnailUri,
  duration: 1,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/xbPQtvj7yRebmtH17',
  waitlist: {
    url: 'https://forms.gle/2eefd2ETDwyJ7HiK6',
    nextSessionMonth: '2026-09',
  },
  lumaTag: 'charted-coding',
  description: `
Coding agents — Copilot, Cursor, Claude Code, and others, are now part of many teams' daily workflow. **How do you benefit from them sustainably**, without degrading code readability or losing control of your architecture?

Somewhere between **Vibe Coding**, fast but hard to maintain, and **Spec-Driven Development**, rigorous but often too heavy, there's a workflow that keeps the feedback loop short *and* the architecture robust. That's the route this workshop charts.

**You'll leave able to:**

- **Choose the right approach for each context** — prototype, production feature, greenfield, brownfield, or legacy.
- **Keep the agent on course** with short feedback loops and tests as executable specification.
- **Wire a deterministic verification layer** the agent cannot quietly bypass.

**The route:** after a head-to-head comparison of Vibe Coding and Spec-Driven Development, you'll practice the Charted Coding workflow on a shared use case:

1. **Chart the Intent** — co-build a pragmatic Design Doc with the agent.
2. **Plot the Waypoints** — turn intent into an ordered PR plan of thin, reviewable slices.
3. **Steer the Cycle** — Scaffold → Red → Green → Refactor, with progressive review.

Then comes the **Harness Engineering** block: skills, hooks, verification gates, testing strategy, Nx boundaries, and ESLint rules, the agent cannot drift past.

The day alternates between **theoretical content**, **live demonstrations**, and **hands-on exercises** — all **framework-agnostic**, with the goal of making you **autonomous** in choosing the right approach and wiring the deterministic layer that keeps it sustainable.
`,
  offer: {
    type: 'early-bird',
    price: 390,
    originalPrice: 490,
  },
  language: 'en',
  requiredSkills: [
    `Development experience in a typed language (TypeScript, Java, C#, Python with types, etc.) — exercises use TypeScript`,
    `Familiarity with automated testing`,
    `Prior use of an AI assistant to generate code (Copilot, Cursor, Claude, etc.) — occasional use is sufficient`,
  ],
  benefits: [
    {
      icon: 'psychology',
      title: 'Map the Landscape',
      description:
        'Contrast Vibe Coding and Spec-Driven Development (Spec Kit, BMAD, OpenSpec, etc.) and tie them to a structured, test-driven approach.',
    },
    {
      icon: 'tune',
      title: 'Right Approach, Right Context',
      description:
        'Choose an AI-assisted workflow suited to prototypes, production features, greenfield, brownfield, or legacy code.',
    },
    {
      icon: 'article',
      title: 'Pragmatic Design Docs',
      description:
        'Write design documents that work for both humans and agents — without drowning in over-specification.',
    },
    {
      icon: 'autorenew',
      title: 'Short Feedback Loops',
      description:
        'Align your intent with the code produced using tight iteration cycles.',
    },
    {
      icon: 'construction',
      title: 'Harness Engineering',
      description:
        'Wire skills, hooks, tests, Nx boundaries, and ESLint rules as a deterministic verification layer the agent cannot quietly bypass.',
    },
    {
      icon: 'health_and_safety',
      title: 'Avoid Classic Pitfalls',
      description:
        'Steer clear of drift, loss of control, over-engineering, review fatigue, and multitasking distraction.',
    },
    {
      icon: 'groups',
      title: 'Fit Your Team',
      description:
        'Integrate these practices into daily workflows and clarify collaboration patterns around tests, prompting, and review.',
    },
    {
      icon: 'savings',
      title: 'Control Costs',
      description:
        'Token spend is just the start. Cut the hidden costs: steering, reviewing, and rejecting AI output.',
    },
  ],
  faqs: [
    {
      question: 'Who is this workshop for?',
      answer:
        'Developers using or wanting to use AI assistants effectively; leads and tech leads framing AI usage; architects and CTOs industrializing AI-assisted development without sacrificing quality; and teams struggling with drift in generated code who want a structured, reproducible approach.',
    },
    {
      question: "What's the experience level?",
      answer:
        'You should be comfortable in a typed language (exercises are in TypeScript), familiar with automated testing, and have tried an AI coding assistant at least occasionally.',
    },
    {
      question: 'What tools do I need?',
      answer:
        'A computer with internet access, microphone, webcam, an up-to-date browser, installation rights, and a working AI assistant (Copilot, Cursor, Claude Code, or equivalent).',
    },
    {
      question: 'Is it hands-on?',
      answer:
        'Yes. After a lecture-and-demo comparison of the main approaches, you practice the Charted Coding workflow on a common use case — Chart the Intent, Plot the Waypoints, Steer the Cycle — then wire harnesses (skills, verification, boundaries). You leave with a collective synthesis and an individual action plan.',
    },
    {
      question: 'Is this tied to a specific framework?',
      answer:
        'No. The principles apply across stacks; tests as executable specification are illustrated with patterns compatible with Vitest, JUnit, pytest, and similar runners.',
    },
    {
      question: 'Can my company fund this?',
      answer: 'Yes. Contact me for a quote and administrative details.',
    },
    {
      question:
        "What's the difference between booking a session and requesting a custom session?",
      answer:
        '"Book a Session" lets you join a scheduled session with other participants. "Custom Session" is for companies who want a private, in-house workshop — with optional adjustments to content, duration, or focus areas.',
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
        title: '👨🏻‍🏫 Mapping the Landscape',
        items: [
          'Defining "Vibe Coding": when it works, why it is appealing, and classic pitfalls (drift, maintainability, illusion of productivity).',
          'Spec-Driven Development: Spec Kit (GitHub), BMAD, OpenSpec, and alternatives — anatomy and how Spec Kit works.',
          'Live demo: the same use case under both approaches — what holds up and what breaks.',
          'Comparative review as narrative: strengths and limits by context; when each pays off — and when it becomes a drag.',
        ],
      },
      {
        title: '👨🏻‍🏫 Principles: Incremental, Agent-Friendly Development',
        items: [
          'Navigating with a map rather than drifting: steering the agent while keeping control of the trajectory.',
          'Chart the Intent: co-building a pragmatic Design Doc with the agent — goals, behavior, design, testing strategy.',
          'Plot the Waypoints: turning intent into an ordered, reviewable PR plan (thin slices that never break the mainline).',
          'Steer the Cycle: Scaffold → Red → Green → Refactor, with progressive review after each slice — not a big-bang review at the end.',
          'Tests as executable specification and as the AI agent’s feedback loop — how this differs from classic TDD.',
          'Compatibility with your current stack (Vitest, JUnit, pytest, etc.) — framework-agnostic mindset.',
          'Introduction to Charted Coding.',
        ],
      },
      {
        title: '💻 Exercise: Chart the Intent',
        items: [
          'Co-author a pragmatic Design Doc with the agent for the shared use case.',
          'Lock goals, non-goals, desired behavior, and high-level design before writing code.',
        ],
      },
      {
        title: '💻 Exercise: Plot the Waypoints',
        items: [
          'Turn the Design Doc into an ordered PR plan: thin, independently reviewable and mergeable slices.',
          'Identify scaffolding, pre-tidy-ups, and feature waypoints that keep the trajectory under control.',
        ],
      },
      {
        title: '💻 Exercise: Steer the Cycle',
        items: [
          'Implement the first waypoint with Scaffold → Red → Green → Refactor.',
          'Progressive review: course-correct after each slice instead of drowning in a late mega-diff.',
        ],
      },
      {
        title: '👨🏻‍🏫 Harness Engineering',
        items: [
          "Skills and hooks: packaging judgment so the agent follows your team's playbook.",
          'Verification gates: short feedback loops the agent must pass before moving on.',
          'Testing strategy as harness: executable specs (for real) that catch drift early.',
          'Nx module boundaries: architectural walls the agent cannot quietly cross.',
        ],
      },
      {
        title: '💻 Exercise: Wiring the Harness',
        items: [
          'Set up or extend skills/hooks for the shared use case.',
          'Add or tighten a verification gate (tests, boundaries, or lint) and watch the agent respect it.',
        ],
      },
      {
        title: '👨🏻‍🏫 Adoption Strategy',
        items: [
          'Integrating the method into an existing team workflow.',
          'Collaboration patterns: who writes the tests, who drives the AI, who reviews.',
        ],
      },
      {
        title: '👨🏻‍🏫 Synthesis and Action Plan',
        items: [
          'Choosing the right approach for the task at hand.',
          'Q&A and feedback from participants.',
        ],
      },
    ],
  },
});
