import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './trusting-agentic-angular.webp';
import thumbnailUri from './trusting-agentic-angular-thumbnail.webp';

export const trustingAgenticAngularFullCourseEn = createWorkshop({
  id: 'trusting-agentic-angular',
  title: 'Trusting Your Agentic Angular Apps: A Testing and Eval Strategy',
  shortTitle: 'Trusting Your Agentic Angular Apps: A Testing and Eval Strategy',
  type: 'full',
  subheading: `Three days to draw the new testing boundaries in your AI-powered apps.
Fake the LLM where you can, eval what's left, and know exactly what each eval costs you.`,
  pictureAltText:
    'Visual metaphor for testing AI-powered Angular apps: a cooking pot holding the Angular logo and a green check, with AG-UI, Vitest, A2UI, Mastra, and Langfuse going in as ingredients.',
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl:
    'https://docs.google.com/forms/d/12D0k9N9o9MKQhKYjEVKllptkNOdwNjJ8lUoskaj5cUo/viewform',
  waitlist: {
    url: 'https://docs.google.com/forms/d/1Orsy9rGHbok0NMRvf_8aesF26ZiNdI65qh4IkOUsUpM/viewform',
  },
  lumaTag: 'trusting-agentic-angular',
  description: `
AI features brought **non-deterministic behavior** into our apps. Building a robust testing strategy was hard enough with deterministic code — now the stakes are higher. How confident are you in what you ship? What happens when you swap the LLM, tweak an agent's instructions, or upgrade a dependency in the middle?

We can't make strict assertions on probabilistic behavior, but we can **grade** it with evals — and we **shouldn't eval what a fast, deterministic test can cover for free**.

Over three days, we take an AI-powered app and build its trust strategy end-to-end: redraw the **System Under Test** across all the layers between the browser and the LLM, fake the model for fast deterministic tests — including at the **AG-UI** boundary and for **A2UI** generative UI — then design evals — datasets, graders, LLM-as-judge — for what's genuinely probabilistic. All while keeping an eye on the bill: tokens, flakiness, and a slower feedback loop.

You leave with working code, a calibrated judge, evals wired into CI, and a decision framework for when to test, when to eval, and when an eval is worth its price. **No prayer required.**

**You'll leave able to:**

- **Redraw the System Under Test** boundaries in apps with LLM layers.
- **Fake the LLM** for fast, deterministic tests — and know when faking lies to you.
- **Test agentic frontends at the AG-UI boundary**: recorded event streams, no model required.
- **Test generative UI built with A2UI**: catalog contracts and UI-as-data assertions.
- **Build eval datasets** from scratch, from production traces, and synthetically.
- **Design and calibrate graders**: code-based checks, LLM-as-judge, and human review.
- **Grade agent trajectories**: tool choice, argument accuracy, and multi-turn behavior.
- **Wire evals into CI** without exploding cost or drowning in flakiness.
- **Close the loop with observability**: traces, online evals, and user feedback.
- **Decide when to test, when to eval, and when to just monitor**, with a decision framework you take home.

*The examples run on TypeScript end-to-end (Vitest, Mastra, Langfuse). Every pattern maps one-to-one to other stacks and frameworks; we name the alternatives as we go.*

To keep the workshop interactive, each session is **limited to 10 attendees**.
`,
  offer: {
    type: 'early-bird',
    price: 1270,
    originalPrice: 1470,
  },
  language: 'en',
  requiredSkills: [
    `Curiosity and good web culture`,
    `Comfortable with TypeScript and automated testing basics (any framework)`,
    `No prior LLM engineering or eval experience required`,
  ],
  benefits: [
    {
      icon: 'schema',
      title: 'Redraw the System Under Test',
      description:
        "Map the layers between the browser and the LLM, and find out what's deterministic, what's probabilistic, and where the boundary really sits.",
    },
    {
      icon: 'theater_comedy',
      title: 'Fake the LLM',
      description:
        'Scripted responses, structured outputs, and tool calls for fast deterministic tests — plus a clear-eyed look at when faking lies to you.',
    },
    {
      icon: 'cable',
      title: 'Test at the AG-UI Boundary',
      description:
        'Use the event stream as a testing seam: record and replay AG-UI streams for frontend tests with no model and no tokens.',
    },
    {
      icon: 'auto_awesome',
      title: 'Test Generative UI with A2UI',
      description:
        'UI-as-data is testable data: assert on A2UI payloads instead of pixels, and validate that generated UI stays inside the trusted catalog.',
    },
    {
      icon: 'fact_check',
      title: 'Eval Fundamentals',
      description:
        'Dataset, task, grader, score: what an eval is made of, how grading differs from asserting, and when to run offline vs online.',
    },
    {
      icon: 'dataset',
      title: 'Datasets That Matter',
      description:
        'Start with a hand-crafted golden set, mine production traces for real cases, and generate synthetic edge cases without fooling yourself.',
    },
    {
      icon: 'gavel',
      title: 'Graders & LLM-as-Judge',
      description:
        'Code graders first, then rubrics and pairwise comparison — and calibrate the judge against human labels before you trust its grades.',
    },
    {
      icon: 'timeline',
      title: 'Grade Agent Trajectories',
      description:
        'Score tool choice, argument accuracy, and ordering across multi-turn conversations, not just the final answer.',
    },
    {
      icon: 'rocket_launch',
      title: 'Evals in CI',
      description:
        'Sampling, caching, pass thresholds vs score tracking, and how to tell a red eval apart from an actual regression.',
    },
    {
      icon: 'savings',
      title: 'Pay the Right Price',
      description:
        'Know the cost per run, per PR, and per day — and keep the feedback loop tax from slowing the inner loop to a crawl.',
    },
    {
      icon: 'monitoring',
      title: 'Observability & Online Evals',
      description:
        'Traces as your new stack trace, online evals and user feedback signals, and the path from production incident to dataset entry.',
    },
    {
      icon: 'account_tree',
      title: 'Your Trust Strategy',
      description:
        'Test, eval, or monitor — per layer, per risk, and per budget. You take the decision tree home.',
    },
  ],
  faqs: [
    {
      question: 'Who is this workshop for?',
      answer:
        'Developers shipping AI features who no longer trust their test suite; QA and testing specialists facing non-deterministic behavior for the first time; and leads, architects, and CTOs who need to know what "confident enough to ship" means when a model is in the loop.',
    },
    {
      question: "What's the experience level?",
      answer:
        'You should be comfortable with TypeScript and the basics of automated testing in any framework. Good web culture and curiosity matter more than seniority.',
    },
    {
      question: 'Do I need prior LLM or eval experience?',
      answer:
        'No. We start from what non-determinism does to assertions, snapshots, and CI, then build evals up from first principles. If you already run evals, the AG-UI and A2UI testing seams, judge calibration, and CI cost work will still be new ground.',
    },
    {
      question: 'Is this tied to a specific stack?',
      answer:
        'The examples run on TypeScript end-to-end, with Vitest, Mastra, and Langfuse. Every pattern maps one-to-one to other stacks and frameworks, and we name the alternatives as we go — the boundaries, the graders, and the cost model transfer, not the tool names.',
    },
    {
      question: 'What tools do I need?',
      answer:
        'A computer with internet access, microphone, webcam, an up-to-date browser, and installation rights.',
    },
    {
      question: 'Is it hands-on?',
      answer:
        "Yes. Each topic ends in an exercise: dissecting an AI feature to draw its SUT boundaries, testing an agentic flow with a fake model, replaying an AG-UI stream, calibrating an LLM judge, grading an agent's trajectory, wiring evals into CI with a budget, and finally building the decision tree you leave with.",
    },
    {
      question: 'Why is capacity limited to 10?',
      answer:
        'To keep the workshop interactive. Ten attendees is the point where everyone still gets their code looked at and their questions answered.',
    },
    {
      question: 'Does this cover building the agents themselves?',
      answer:
        'No. Agent integration, security, and generative UI are covered in the companion workshop, "Agentic Angular: Baking Safe AI Agents Into Your Apps". This one picks up where that leaves off: proving the thing works.',
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
        title: '👨🏻‍🏫 Why Your Testing Strategy Just Broke',
        items: [
          'What non-determinism does to assertions, snapshots, and CI.',
          'The failure modes: hallucination, drift, prompt regressions, model swaps.',
          'Test, eval, or pray: the three postures and what each one buys you.',
        ],
      },
      {
        title: '👨🏻‍🏫 The New System Under Test',
        items: [
          'Mapping the layers between the browser and the LLM: UI, AG-UI wire, orchestration, tools, prompts, model.',
          "What's deterministic, what's probabilistic, and where the boundary really sits.",
        ],
      },
      {
        title: '💻 Exercise: Dissect an AI Feature and Draw Its SUT Boundaries',
        items: [
          'Take a real feature apart layer by layer, and mark where determinism actually ends.',
        ],
      },
      {
        title: '👨🏻‍🏫 Faking the LLM',
        items: [
          'Faking at the model boundary: scripted responses, structured outputs, tool calls.',
          'Record & replay: when it helps, when it rots.',
          "What fakes can prove — and the confidence they can't give you.",
        ],
      },
      {
        title:
          '💻 Exercise: Test an Agentic Flow Deterministically with a Fake Model',
        items: [
          'Swap the model for a fake, and get an agentic flow under fast, repeatable test.',
        ],
      },
      {
        title: '👨🏻‍🏫 Testing the Deterministic Shell',
        items: [
          'Tools are just functions: testing them like you always did.',
          'Prompt assembly, context construction, and structured output parsing.',
          'Guardrails and validation layers: testing the safety net, not the model.',
        ],
      },
      {
        title:
          '💻 Exercise: Cover the Orchestration Layer Without Spending a Single Token',
        items: [
          'Put the deterministic shell under test, and watch the token bill stay at zero.',
        ],
      },
      {
        title: '👨🏻‍🏫 Testing Agent Behavior Without a Real Model',
        items: [
          'Scripting multi-turn conversations and tool-call sequences.',
          'Simulating failure: timeouts, malformed outputs, refusals.',
        ],
      },
      {
        title:
          '💻 Exercise: Reproduce and Fix a Bug with a Scripted Conversation',
        items: [
          'Turn a flaky, hard-to-reproduce report into a deterministic failing test, then make it pass.',
        ],
      },
      {
        title: '👨🏻‍🏫 Testing at the AG-UI Boundary',
        items: [
          'The event stream as a testing seam: run lifecycle, messages, tool calls, state deltas.',
          'Recording and replaying AG-UI streams: deterministic frontend tests, no model, no tokens.',
          'Asserting on the wire: what the agent said vs what the UI rendered.',
          'Streaming edge cases: partial messages, cancellation, reconnection.',
        ],
      },
      {
        title:
          '💻 Exercise: Test a Chat Feature Against a Replayed AG-UI Stream',
        items: [
          'Record a run once, then test the whole chat surface against it forever, for free.',
        ],
      },
      {
        title: '👨🏻‍🏫 Testing Generative UI with A2UI',
        items: [
          'UI-as-data is testable data: asserting on A2UI payloads instead of pixels.',
          'Catalog contracts: validating that generated UI stays inside the trusted catalog.',
          'Rendering tests: from A2UI JSONL to your design system components.',
        ],
      },
      {
        title: '💻 Exercise: Lock Down a Generative UI Feature',
        items: [
          'Pin a generative UI feature with catalog contracts and rendering tests.',
        ],
      },
      {
        title: '👨🏻‍🏫 Eval Fundamentals',
        items: [
          'Anatomy of an eval: dataset, task, grader, score.',
          'Evals vs tests: grading vs asserting.',
          'Offline vs online evals.',
        ],
      },
      {
        title: '💻 Exercise: Write Your First Eval',
        items: [
          'Build a dataset, a task, and a grader, and get a score you can actually reason about.',
        ],
      },
      {
        title: '👨🏻‍🏫 Building Datasets That Matter',
        items: [
          'Starting small: hand-crafted golden datasets.',
          'Mining production traces for real cases.',
          'Synthetic data: generating edge cases without fooling yourself.',
        ],
      },
      {
        title: '💻 Exercise: Build a Dataset from Traces and Synthetic Cases',
        items: [
          'Mine real traces, generate the edge cases they miss, and end up with a set worth grading against.',
        ],
      },
      {
        title: '👨🏻‍🏫 Graders & LLM-as-Judge',
        items: [
          'Code graders first: exact match, contains, structural checks.',
          'LLM-as-judge: rubrics, pairwise comparison, known biases.',
          'Calibrating the judge against human labels — trusting the grader before trusting the grades.',
        ],
      },
      {
        title: '💻 Exercise: Build and Calibrate an LLM Judge',
        items: [
          'Write the rubric, run it against human labels, and find out how much your judge can be trusted.',
        ],
      },
      {
        title: '👨🏻‍🏫 Evaluating Agents End-to-End',
        items: [
          'Trajectory evals: grading tool choice, arguments, and ordering — not just the final answer.',
          'Multi-turn evals: simulated users and conversation-level scoring.',
          'Grading generative UI: did the agent pick the right A2UI components for the job?',
        ],
      },
      {
        title: "💻 Exercise: Grade an Agent's Trajectory on a Multi-Step Task",
        items: [
          'Score the path, not just the destination: tool choice, arguments, and order.',
        ],
      },
      {
        title: '👨🏻‍🏫 Evals in CI: Paying the Right Price',
        items: [
          'Where the tokens go: cost per run, per PR, per day.',
          'Sampling, caching, and pass thresholds vs score tracking.',
          "Handling variance: when a red eval isn't a regression.",
          'The feedback loop tax: keeping the inner loop fast.',
        ],
      },
      {
        title: '💻 Exercise: Wire Evals into CI with a Budget',
        items: [
          'Get evals running on every PR without the bill or the wait getting out of hand.',
        ],
      },
      {
        title: '👨🏻‍🏫 Observability & Online Evals',
        items: [
          'Traces as your new stack trace.',
          'Online evals and user feedback signals.',
          'From production incident to dataset entry: closing the loop.',
        ],
      },
      {
        title:
          '💻 Exercise: Instrument the App and Turn a Trace into an Eval Case',
        items: [
          'Wire up tracing, catch a real failure, and promote it into your dataset.',
        ],
      },
      {
        title: '👨🏻‍🏫 Defining Your Trust Strategy',
        items: [
          'The decision framework: test, eval, monitor — per layer, per risk.',
          'What to run on every commit, every night, every release.',
          "When an eval is worth its price — and when it isn't.",
          'A takeaway decision tree.',
          'Agent integration, security & generative UI are covered in the companion workshop: “Agentic Angular: Baking Safe AI Agents Into Your Apps”.',
        ],
      },
      {
        title: '💻 Exercise: Build the Decision Tree for Your Own App',
        items: [
          'Test, eval, or monitor — decided layer by layer, for the app you actually ship.',
        ],
      },
    ],
  },
});
