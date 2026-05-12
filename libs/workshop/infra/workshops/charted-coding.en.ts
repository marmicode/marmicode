import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './charted-coding.webp';
import thumbnailUri from './charted-coding-thumbnail.webp';
import { CHARTED_CODING_FULL_COURSE_ID } from './charted-coding.shared';

export const chartedCodingFullCourseEn = createWorkshop({
  id: CHARTED_CODING_FULL_COURSE_ID,
  title: 'Charted Coding: AI-Assisted Development Without the Drift',
  shortTitle: 'Charted Coding: AI-Assisted Development Without the Drift',
  type: 'full',
  subheading: `One day to move from fast-but-fragile AI coding to approaches you can sustain.
Map Vibe Coding and Spec-Driven Development — then chart a path your architecture can live with.`,
  pictureAltText:
    'Visual metaphor for charted AI-assisted development: a clear path or map guiding collaboration between a developer and an AI assistant.',
  pictureUri,
  thumbnailUri,
  duration: 1,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/xbPQtvj7yRebmtH17',
  waitlistUrl: 'https://forms.gle/2eefd2ETDwyJ7HiK6',
  lumaTag: 'charted-coding',
  description: `
AI assistants — Copilot, Cursor, Claude Code, and others — are now part of many teams' daily workflow.

**How can you benefit from them sustainably**, without degrading code readability or losing control of your architecture?

**Where do you draw the line** between Vibe Coding — fast but hard to maintain — and a more structured approach that can sometimes feel too heavy?

**How do you keep a short feedback loop** with the agent (or agents) without sacrificing the quality of the code produced and long-term maintainability?

This training explores the main approaches to AI-assisted development — from Vibe Coding to Spec-Driven Development — and equips you with **framework-agnostic methods, tools, and techniques** that put the feedback loop at the heart of your collaboration with the AI agent.

**On the menu:** hands-on practice of the different approaches on a **single use case**, identification of their strengths and limitations, then application of a **structured method** to produce maintainable, testable code that matches your intent.

The day alternates between **theoretical content**, **live demonstrations**, and **hands-on exercises**, with the goal of making you **autonomous** in choosing and applying the right approach for your context.
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
        'Yes. You will practice throughout the day on a common use case, compare approaches directly on the same problem, and leave with a collective synthesis and an individual action plan.',
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
        title: '👨🏻‍🏫 Vibe Coding',
        items: [
          'Defining “Vibe Coding”.',
          'When it works (and why it is appealing).',
          'Classic pitfalls: drift, maintainability issues, illusion of productivity.',
        ],
      },
      {
        title: '💻 Exercise: Vibe Coding',
        items: [
          'Iterate with Vibe Coding on the initial feature.',
          'Cool-headed analysis: what holds up and what breaks.',
        ],
      },
      {
        title: '👨🏻‍🏫 Spec-Driven Development & Spec Kit',
        items: [
          'The Spec-Driven approach: Spec Kit (GitHub), BMAD, OpenSpec, and alternatives.',
          'Anatomy and inner workings of Spec Kit.',
        ],
      },
      {
        title: '💻 Exercise: Spec-Driven Approach',
        items: [
          'Revisit the same use case with a spec-driven workflow.',
          'Pros and cons — lessons learned.',
        ],
      },
      {
        title: '👨🏻‍🏫 Comparative Review',
        items: [
          'Strengths and limitations of each approach depending on context.',
          'When Vibe Coding is enough — and when it becomes dangerous.',
          'When Spec-Driven pays off — and when it becomes a drag.',
        ],
      },
      {
        title: '👨🏻‍🏫 Principles: Incremental, Agent-Friendly Development',
        items: [
          'Navigating with a map rather than drifting: steering the agent while keeping control of the trajectory.',
          'Co-building a pragmatic “Design Doc” with the agent — and orchestrating review by specialized agents.',
          'The Scaffold → Red → Green → Refactor cycle.',
          'Tests as executable specification and as the AI agent’s feedback loop — how this differs from classic TDD.',
          'Compatibility with your current stack (Vitest, JUnit, pytest, etc.) — framework-agnostic mindset.',
          'Introduction to Charted Coding.',
        ],
      },
      {
        title: '💻 Exercise: Incremental Approach',
        items: ['Iterate on the common use case using the incremental method.'],
      },
      {
        title: '👨🏻‍🏫 Extensions: Skills, MCP Servers, OpenSpec',
        items: [
          'Extending the method with Skills and MCP servers.',
          'Integration with OpenSpec.',
        ],
      },
      {
        title: '💻 Exercise: OpenSpec',
        items: ['Practice the incremental approach with OpenSpec integration.'],
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
