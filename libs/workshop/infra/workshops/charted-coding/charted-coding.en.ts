import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './charted-coding.webp';
import thumbnailUri from './charted-coding-thumbnail.webp';

export const chartedCodingFullCourseEn = createWorkshop({
  id: 'charted-coding',
  title: 'Charted Coding: AI-Assisted Development Without the Drift',
  shortTitle: 'Charted Coding: AI-Assisted Development Without the Drift',
  type: 'full',
  subheading: `Two days to move from fast-but-fragile AI coding to approaches you can sustain.
Map the landscape, chart a method your architecture can live with, then engineer the harness that keeps the agents on course.`,
  pictureAltText:
    'Visual metaphor for charted AI-assisted development: a clear path or map guiding collaboration between a developer and an AI assistant.',
  pictureUri,
  thumbnailUri,
  duration: 2,
  location: 'online',
  customSessionRequestUrl: 'https://forms.gle/xbPQtvj7yRebmtH17',
  // waitlist: { url: 'https://forms.gle/2eefd2ETDwyJ7HiK6' },
  lumaTag: 'charted-coding',
  description: `
Coding agents (Claude Code, Cursor, Copilot, and others) are now part of many teams' daily workflow. **How do you benefit from them sustainably**, without degrading code readability, losing control of your architecture, or drowning in review fatigue?

Somewhere between **Vibe Coding**, fast but hard to maintain, and **Spec-Driven Development**, which can trade a large code review for an equally large Markdown review, there's a workflow that keeps the feedback loop short *and* the architecture robust. That's the route this workshop charts, over two days, from first principles to a harness you can run on Monday.

**You'll leave able to:**

- **Choose the right approach for each context**: prototype, production feature, greenfield, brownfield, or legacy.
- **Keep the agent on course** with short feedback loops and tests as executable specification.
- **Diagnose and fix context rot** (sycophancy, context clash, confusion, instruction drift, and poisoning) with context isolation and reduction.
- **Author your own skills** to package your team's judgment and compound what you learn from steering the agent.
- **Wire a deterministic verification layer**, a gate ladder from hooks to CI, the agent cannot quietly bypass.
- **Engineer the loop, not just the prompt**: automatically trigger the right step at the right time, apply backpressure to keep the agent on track, and bring a human in the loop when needed.

The method itself is three steps: **Chart the Intent** (co-build a pragmatic Design Doc), **Plot the Waypoints** (an ordered PR plan of thin, reviewable slices), **Steer the Cycle** (Scaffold → Red → Green → Refactor with progressive review).

Throughout, the workshop alternates between **theoretical content**, **live demonstrations**, and **hands-on exercises**, all **framework-agnostic** with exercises in TypeScript, with the goal of making you **autonomous** in choosing the right approach and wiring the deterministic layer that keeps it sustainable.
`,
  offer: {
    type: 'early-bird',
    price: 870,
    originalPrice: 1070,
  },
  language: 'en',
  requiredSkills: [
    `Comfortable with TypeScript; exercises and tooling (Vitest, ESLint) come from the JavaScript ecosystem`,
    `Familiarity with automated testing`,
    `Prior use of an AI assistant to generate code (Claude, Cursor, Copilot, etc.); occasional use is sufficient`,
  ],
  benefits: [
    {
      icon: 'psychology',
      title: 'Map the Landscape',
      description:
        'Contrast Vibe Coding, Spec-Driven Development (Spec Kit, BMAD, OpenSpec, etc.), and Charted Coding, and tie each to the pain points it solves or creates.',
    },
    {
      icon: 'tune',
      title: 'Right Approach, Right Context',
      description:
        'Choose an AI-assisted workflow suited to prototypes, production features, greenfield, brownfield, or legacy code.',
    },
    {
      icon: 'hub',
      title: 'Engineer the Context',
      description:
        'Diagnose context rot (sycophancy, context clash, confusion, instruction drift, poisoning) and fix it with sub-agents, handoff docs, compaction, and progressive disclosure.',
    },
    {
      icon: 'article',
      title: 'Pragmatic Design Docs',
      description:
        'Write design documents that work for both humans and agents, without drowning in over-specification.',
    },
    {
      icon: 'autorenew',
      title: 'Short Feedback Loops',
      description:
        'Align your intent with the code produced using tight iteration cycles.',
    },
    {
      icon: 'diversity_3',
      title: 'Chorus Programming',
      description:
        'Keep collective ownership alive: code live with your team and your agents on a shared branch, with small commits and cheap, continuous review.',
    },
    {
      icon: 'construction',
      title: 'Harness Engineering',
      description:
        'Wire skills, hooks, tests, Nx boundaries, and ESLint rules as a deterministic verification layer the agent cannot quietly bypass.',
    },
    {
      icon: 'speed',
      title: 'Hooks, Backpressure & the Gate Ladder',
      description:
        'Match each check to its risk and latency, from on-write hooks to git hooks, CI, and agentic workflows, to catch bad changes before they compound.',
    },
    {
      icon: 'auto_awesome',
      title: 'Author Your Own Skills',
      description:
        'Use skill-creator to turn an interview into a reusable, progressively-disclosed skill that packages your team’s judgment.',
    },
    {
      icon: 'trending_up',
      title: 'Steering Compounds',
      description:
        'Capture the corrections you repeat and promote them into skills, so the next session starts smarter.',
    },
    {
      icon: 'health_and_safety',
      title: 'Avoid Classic Pitfalls',
      description:
        'Steer clear of drift, loss of control, over-engineering, review fatigue, and multitasking distraction.',
    },
    {
      icon: 'savings',
      title: 'Control Costs',
      description:
        'Token spend is just the start. Compare workflows on review time and steering cost, not just the invoice.',
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
        'You should be comfortable with TypeScript, familiar with automated testing, and have tried an AI coding assistant at least occasionally.',
    },
    {
      question: 'What tools do I need?',
      answer:
        'A computer with internet access, microphone, webcam, an up-to-date browser, installation rights, and a working AI assistant (Claude Code, Cursor, Copilot, or equivalent).',
    },
    {
      question: 'Is it hands-on?',
      answer:
        'Yes. After a lecture-and-demo comparison of the main approaches, you practice the Charted Coding workflow on a common use case (Chart the Intent, Plot the Waypoints, Steer the Cycle), then author your own skill and wire a harness (hooks, verification gates, Nx boundaries). You leave with a collective synthesis and an individual action plan.',
    },
    {
      question: 'Is this tied to a specific framework?',
      answer:
        'No. The principles apply across stacks and languages, and that is the point: the workflow, the context engineering, and the harness transfer to whatever you build with. Exercises are in TypeScript, though, and some of them lean on JavaScript ecosystem tooling (Vitest, ESLint, Nx) — you will be translating those examples to your own toolchain, not the ideas behind them.',
    },
    {
      question: 'Can my company fund this?',
      answer: 'Yes. Contact me for a quote and administrative details.',
    },
    {
      question:
        "What's the difference between booking a session and requesting a custom session?",
      answer:
        '"Book a Session" lets you join a scheduled session with other participants. "Custom Session" is for companies who want a private, in-house workshop, with optional adjustments to content, duration, or focus areas.',
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
        title: '👨🏻‍🏫 Captain, We’re Drifting',
        items: [
          'Defining "Vibe Coding": when it works, why it is appealing, and classic pitfalls (drift, cognitive debt / deskilling, isolated and unconscious decisions, not enough checkpoints).',
          'Spec-Driven Development: Spec Kit (GitHub), BMAD, OpenSpec, and alternatives; anatomy and how Spec Kit works.',
          'Live demo: the same use case under both approaches, showing what holds up and what breaks.',
          'Comparative review as narrative: strengths and limits by context; when each pays off, and when it becomes a drag.',
          'Slow feedback loops, the context-switching tax, and steering cost: naming the hidden costs of AI-assisted development.',
        ],
      },
      {
        title: '💻 Exercise: Review Fatigue',
        items: [
          'Ten minutes to find contradictions in your assigned packet: a Design Doc or a Spec Kit folder for the same feature.',
          'No agent, no cross-checking the other packet: a firsthand look at review fatigue and the limits of a static spec.',
        ],
      },
      {
        title: '👨🏻‍🏫 Context Engineering',
        items: [
          'Context rot: how accuracy degrades well before the context window fills up.',
          'Symptoms to recognize: sycophancy, context clash / contradiction, confusion, instruction drift, distraction, poisoning.',
          'Context isolation: sub-agents and handoff docs instead of one sprawling conversation.',
          'Context reduction: compaction, compute offloading, and reducing tool verbosity.',
          'Progressive disclosure, and CLI vs. MCP trade-offs for tool definitions.',
        ],
      },
      {
        title: '👨🏻‍🏫 Agent Skills',
        items: [
          'Anatomy of a skill: SKILL.md, references/, scripts/, assets/, and why progressive disclosure keeps context lean.',
          'A short history: CLAUDE.md, AGENTS.md, Claude Skills, Agent Skills.',
          'Managing skills like npm packages: `npx skills add / install / update / remove`.',
        ],
      },
      {
        title: '💻 Exercise: Skill Unfolding',
        items: [
          'Run the same prompt twice: once with no skill installed, once with `angular-developer` installed.',
          'Note which reference files the agent opens in each round: progressive disclosure, observed directly.',
        ],
      },
      {
        title:
          '👨🏻‍🏫 Charting the Course: Incremental, Agent-Friendly Development',
        items: [
          'Navigating with a map rather than drifting: steering the agent while keeping control of the trajectory.',
          'Chart the Intent: co-building a pragmatic Design Doc with the agent, covering goals, behavior, design, and testing strategy.',
          'Plot the Waypoints: turning intent into an ordered, reviewable PR plan (thin slices that never break the mainline).',
          'Steer the Cycle: Scaffold → Red → Green → Refactor, with progressive review after each slice, not a big-bang review at the end.',
          'Tests as executable specification and as the AI agent’s feedback loop: how this differs from classic TDD.',
          'Compatibility with your current stack (Vitest, JUnit, pytest, etc.): a framework-agnostic mindset.',
          'Cost and delay compared, step by step, against a "common" Spec Kit flow.',
        ],
      },
      {
        title: '💻 Exercise: Charted Design',
        items: [
          'Install the Charted Coding skills with `npx skills add marmicode/skills`.',
          'Co-build a weekly meal-plan Design Doc with `/charted-design`: the hard part is the testing strategy and the ordered PR plan, not the feature list.',
          'Answer the agent’s questions and edit the doc as you go. No implementation yet.',
        ],
      },
      {
        title: '👨🏻‍🏫 Chorus Programming',
        items: [
          'Why pair programming drifts into isolation and mob programming into tunnels, and what both lose: collective ownership.',
          'Limbo: live, shared programming ("how low can you go?"), small commits that never break the build.',
          'Rules: live communication, a chorus size of 2 (max 3), co-design, and one person free to focus on behavior while others handle structure.',
          'Outcome: cheaper review because everyone has already seen most of the code, faster development, and drift caught early.',
        ],
      },
      {
        title: '💻 Exercise: Charted Implementation',
        items: [
          'Implement the meal plan with `/charted-scaffold`, `/charted-red`, `/charted-green`, or `/charted-continue`.',
          'The goal is to feel the right step granularity: thin slices, PR by PR.',
        ],
      },
      {
        title: '👨🏻‍🏫 Steering the Ship: Harness Engineering',
        items: [
          'The harness as a system: model, context, tools, constraints, feedback loop, orchestration, memory (skills, ADRs), and the human in the loop.',
          "Skills and hooks: packaging judgment so the agent follows your team's playbook.",
          'Verification gates: short feedback loops the agent must pass before moving on.',
          'Testing strategy as harness: executable specs (for real) that catch drift early.',
          'Nx module boundaries: architectural walls the agent cannot quietly cross.',
        ],
      },
      {
        title: '👨🏻‍🏫 Skill Authoring',
        items: [
          'Using `/skill-creator` to turn an interview into a packaged, reusable skill instead of a one-off prompt.',
          'Nudging the agent to interview with `AskUserQuestion` rather than free-form chat.',
          'Writing the design doc as the skill is created, so you can review, edit, and commit it as you go.',
        ],
      },
      {
        title: '💻 Exercise: Custom Design Skill',
        items: [
          'Install `skill-creator` and build a custom `codesign` skill from scratch, from your answers alone.',
          'Try the new skill on a feature of your choice.',
        ],
      },
      {
        title: '👨🏻‍🏫 Hooks, Backpressure & the Gate Ladder',
        items: [
          'Backpressure: catching bad or superfluous changes before they compound, instead of after a big-bang review.',
          'The gate ladder, matched to latency and risk: on-write hooks and git hooks (~seconds), CI and agentic workflows (~minutes), human review (~minutes to hours).',
          'Hooks in practice: UserPromptSubmit, PreToolUse / PostToolUse, Stop, and why there is no "standard" yet (and the compat layers that exist).',
          'Loop engineering: wiring a done-condition (e.g. `nx affected -t lint,test` exits with code 0) so the agent iterates unattended, preferred over manual `/goal` and polling.',
        ],
      },
      {
        title: '💻 Exercise: Fast Feedback',
        items: [
          'Write a `PostToolUse` ESLint hook, typed against Claude SDK’s types, that feeds lint failures straight back to the agent.',
          'Compare the same prompt before and after the hook is wired: watch it self-correct instead of waiting for review.',
        ],
      },
      {
        title: '👨🏻‍🏫 Architecture Boundaries with Nx',
        items: [
          'Implicit libraries: any `index.ts` becomes a tagged project (platform / scope / type) without hand-written `project.json` files.',
          'Enforcing module boundaries with dependency constraints so an agent cannot quietly cross an architectural wall.',
        ],
      },
      {
        title: '💻 Exercise: Architecture Feedback',
        items: [
          'Configure `depConstraints` so modules of type `ui` cannot import modules of type `infra`.',
          'Point ESLint at the dependency graph and watch the same prompt respect the boundary instead of just being told about it.',
        ],
      },
      {
        title: '👨🏻‍🏫 Dropping Anchor: Steering Compounds',
        items: [
          'A correction you have made twice is a skill you have not written yet.',
          'Capture: a hook notices the correction and writes it down while you are still in the moment.',
          'Promote: the note becomes a skill, and the next session starts smarter.',
        ],
      },
      {
        title: '💻 Exercise: Steering Capture',
        items: [
          'Implement a `UserPromptSubmit` hook that detects steering in your prompts and appends it to a learnings file.',
          'Implement a `Stop` hook that reminds you to run `/save-learnings` whenever learnings are pending.',
        ],
      },
      {
        title: '👨🏻‍🏫 Adoption Strategy: Your Monday',
        items: [
          'Integrating the method into an existing team workflow, and collaboration patterns: who writes the tests, who drives the AI, who reviews.',
          'Building your own "let\'s cook" skill that branches by task (spike, bug fix, small change, or major feature) and unfolds a different workflow for legacy code.',
          'Deterministic Design Doc and ADR templates: markdown + checkboxes + emojis you can check with a script, not a human.',
          'Setting up fast-feedback hooks: lint on write, `nx affected` or `vitest --changed` on Stop.',
        ],
      },
      {
        title: '👨🏻‍🏫 Synthesis and Action Plan',
        items: [
          'Cheatsheet: typed hooks, treating third-party skills like npm packages (supply chain and prompt-injection risk), progressive disclosure, and compounding learnings into reviewed, evaluated skills.',
          'Choosing the right approach for the task at hand.',
          'Q&A and feedback from participants.',
        ],
      },
    ],
  },
});
