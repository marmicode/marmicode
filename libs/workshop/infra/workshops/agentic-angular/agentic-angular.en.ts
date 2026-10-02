import { createWorkshop } from '@marmicode/workshop/core';
import pictureUri from './agentic-angular.webp';
import thumbnailUri from './agentic-angular-thumbnail.webp';

export const agenticAngularFullCourseEn = createWorkshop({
  id: 'agentic-angular',
  title: 'Agentic Angular: Baking Safe AI Agents Into Your Apps',
  shortTitle: 'Agentic Angular: Baking Safe AI Agents Into Your Apps',
  type: 'full',
  subheading: `Three days to bake agents that survive production into the Angular apps you already have.
Generative UI, human-in-the-loop, security, auth — and a takeaway decision tree.`,
  pictureAltText:
    'Visual metaphor for baking AI agents into Angular apps: a cooking pot holding the Angular logo, with AG-UI, A2UI, and Mastra going in as ingredients.',
  pictureUri,
  thumbnailUri,
  duration: 3,
  location: 'online',
  customSessionRequestUrl:
    'https://docs.google.com/forms/d/15DGO5hMrlwqqamq15Qq_ydJlkiamprjvLsnl7AXT4Y8/viewform',
  waitlist: {
    url: 'https://docs.google.com/forms/d/1PhkR41Zu21Rux5hajJB77UjR5L_LRZNdJqDAJmuY90I/viewform',
  },
  lumaTag: 'agentic-angular',
  description: `
The gap between an agent demo and an agent in production is real: **confirmations the agent can't bypass**, identity that actually reaches the runtime, threads that survive a page refresh, responses that stream in before users give up, a token bill that doesn't outgrow the feature, and an answer for the day someone pastes a document with hidden instructions in it.

This workshop is about **closing that gap**. Over three days, we take an existing Angular app, and bake agents into it with **CopilotKit**, **AG-UI**, and **A2UI**: human-in-the-loop, server-side guardrails, and generative UI included. You leave with working code, sharpened instincts, and a decision tree for what goes agentic, on which surface, with which guardrails.

The agent side runs on **Mastra**, TypeScript end-to-end. Every pattern maps one-to-one to LangGraph and friends; we name both as we go, and **AG-UI is the boundary that makes the choice reversible**.

**You'll leave able to:**

- **Integrate AI agents** into your existing Angular apps with CopilotKit and AG-UI.
- **Keep humans in control** with approvals, interrupts, and server-side confirmation.
- **Secure the agent boundary**: prompt injection, tool scoping, auth.
- **Persist and resume threads** across sessions and reconnections.
- **Build generative UI** with A2UI, inside and outside the chat surface.
- **Decide when to go agentic**, which surface, which tier, with a decision tree you take home.

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
    `Familiarity with the Angular ecosystem (e.g. creating a component, implementing and using inputs and outputs; Signals experience is a plus)`,
    `No prior agent or LLM engineering experience required`,
  ],
  benefits: [
    {
      icon: 'smart_toy',
      title: 'Agent Fundamentals, Fast',
      description:
        "The agent loop, context windows, and tokens — plus why a model can't tell instructions from data, and why that bites you later.",
    },
    {
      icon: 'explore',
      title: 'Map the Agentic Stack',
      description:
        "AG-UI, A2UI, MCP Apps, and WebMCP: who does what, where each one stands on maturity and adoption, and what's still a bet.",
    },
    {
      icon: 'cable',
      title: 'AG-UI Under the Hood',
      description:
        'Events, run lifecycle, messages, tool calls, and state deltas: read the wire before touching an SDK.',
    },
    {
      icon: 'integration_instructions',
      title: 'CopilotKit for Angular',
      description:
        'Runtime setup, pre-built chat vs headless, and Signals & DI integration — inside an app you already have, not a greenfield toy.',
    },
    {
      icon: 'sync_alt',
      title: 'Shared State',
      description:
        'Bi-directional agent ↔ app sync, read-only vs read/write, and the streaming and predictive updates that keep it feeling fast.',
    },
    {
      icon: 'front_hand',
      title: 'Human in the Loop',
      description:
        'Approval buttons, edit-before-execute, and structured input — and a clear-eyed look at the limits of tool-based approval.',
    },
    {
      icon: 'pause_circle',
      title: 'Interrupts That Hold',
      description:
        'Suspend the run agent-side, confirm the exact args rather than the intent, and resume after a refresh.',
    },
    {
      icon: 'forum',
      title: 'Threads & Recovery',
      description:
        'Persist multi-session conversations, resume after a crash or a dropped stream, and cancel a run cleanly.',
    },
    {
      icon: 'security',
      title: 'Secure the Agent Boundary',
      description:
        'Prompt injection, sensitive information disclosure, guardrails that moderate streams in flight, and least-privilege tool scoping.',
    },
    {
      icon: 'key',
      title: 'Auth That Reaches the Runtime',
      description:
        'Propagate user identity to the agent runtime, scope tools per user and role, and lock down the runtime endpoint.',
    },
    {
      icon: 'auto_awesome',
      title: 'Generative UI with A2UI',
      description:
        'Declarative UI-as-data, the Angular renderer, a trusted catalog as a security model, and agent-driven UI beyond the chat surface.',
    },
    {
      icon: 'savings',
      title: 'Performance & Cost',
      description:
        "Find out where the tokens go, then cut cost and boost speed so the bill doesn't outgrow the feature.",
    },
    {
      icon: 'account_tree',
      title: 'Your Agentic Decision Tree',
      description:
        'Which features deserve an agent, which surface fits each use case, and which risk tier each tool belongs to. You take the tree home.',
    },
  ],
  faqs: [
    {
      question: 'Who is this workshop for?',
      answer:
        'Angular developers who want to bake agentic features into a real app rather than bolt a chatbot next to it; leads and tech leads framing how AI shows up in the product; and architects and CTOs who need the security, auth, and cost questions answered before shipping.',
    },
    {
      question: "What's the experience level?",
      answer:
        'You should be familiar with the Angular ecosystem — creating a component, implementing and using inputs and outputs. Signals experience is a plus. Good web culture and curiosity matter more than seniority.',
    },
    {
      question: 'Do I need prior agent or LLM experience?',
      answer:
        "No. We start from how LLMs actually work, the agent loop, and what a turn costs you in tokens, then build up from there. If you've already shipped agents, the human-in-the-loop, security, and generative UI days will still be new ground.",
    },
    {
      question: 'Which agent framework do you use?',
      answer:
        'The agent side runs on Mastra, so the workshop is TypeScript end-to-end. Every pattern maps one-to-one to LangGraph and friends, and we name both as we go. AG-UI is the boundary that makes that choice reversible.',
    },
    {
      question: 'What tools do I need?',
      answer:
        'A computer with internet access, microphone, webcam, an up-to-date browser, and installation rights.',
    },
    {
      question: 'Is it hands-on?',
      answer:
        'Yes. Each topic ends in an exercise: speaking AG-UI over plain SSE, embedding an agent into an existing Angular app, enforcing confirmation on the server, red-teaming then hardening your own agent, rendering A2UI with your design system, and finally building the decision tree you leave with.',
    },
    {
      question: 'Why is capacity limited to 10?',
      answer:
        'To keep the workshop interactive. Ten attendees is the point where everyone still gets their code looked at and their questions answered.',
    },
    {
      question: 'Does this cover evals and testing?',
      answer:
        'Only in passing. Evals, observability, and testing are intentionally out of scope here — they are covered in the companion workshop, "Trusting your AI apps: A Testing and Eval Strategy".',
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
        title: '👨🏻‍🏫 Agent Fundamentals, Fast',
        items: [
          'How LLMs work.',
          'The agent loop: model, context, tools, and what actually happens per turn.',
          'Context windows and tokens: what they cost you later.',
          "Why a model can't tell instructions from data, and why that matters.",
        ],
      },
      {
        title: '👨🏻‍🏫 The Agentic Stack',
        items: [
          'Why bake agents into your apps, instead of bolting a chatbot next to them.',
          'Mapping the ecosystem: AG-UI vs A2UI vs MCP Apps vs WebMCP.',
          'Where each one stands: maturity, adoption, momentum.',
        ],
      },
      {
        title: '👨🏻‍🏫 AG-UI Under the Hood',
        items: [
          'The protocol: events, run lifecycle, messages, tool calls, state deltas.',
          'Reading the wire before touching an SDK.',
        ],
      },
      {
        title: '💻 Exercise: Speaking AG-UI over Plain SSE',
        items: [
          'Drive a run end to end over raw server-sent events, with no SDK in the way.',
        ],
      },
      {
        title: '👨🏻‍🏫 CopilotKit for Angular',
        items: [
          'Runtime setup.',
          'Pre-built chat vs headless.',
          'Signals & DI integration.',
        ],
      },
      {
        title: '💻 Exercise: Embedding an Agent into an Existing Angular App',
        items: [
          'Wire the runtime, drop in a surface, and get the first agent turn running inside an app that already exists.',
        ],
      },
      {
        title: '👨🏻‍🏫 Debugging & Dev Tools',
        items: [
          'The event stream is your stack trace: reading AG-UI in the network tab and dev tools.',
          'Mastra Studio’s traces.',
        ],
      },
      {
        title: '💻 Exercise: Diagnose a Misbehaving Agent',
        items: [
          'Track a broken run down to the event that caused it, using the stream and the traces.',
        ],
      },
      {
        title: '👨🏻‍🏫 Shared State',
        items: [
          'Bi-directional agent ↔ app sync.',
          'Read-only vs read/write.',
          'Perceived speed: streaming, predictive state updates.',
        ],
      },
      {
        title: '💻 Exercise: Syncing Agent and App State',
        items: [
          'Share state in both directions, then make it feel instant with streaming and predictive updates.',
        ],
      },
      {
        title: '👨🏻‍🏫 Frontend Tools & Generative UI',
        items: [
          'Exposing frontend tools to the agent.',
          'Rendering tool calls as Angular components.',
        ],
      },
      {
        title: '💻 Exercise: From Tool Call to Component',
        items: [
          'Expose a frontend tool and render its call as a real Angular component instead of a wall of text.',
        ],
      },
      {
        title: '👨🏻‍🏫 Human in the Loop',
        items: [
          'The simplest loop: a frontend tool that asks the user.',
          'Approval buttons, edit-before-execute, structured input.',
          'The limitations of tool-based approval.',
        ],
      },
      {
        title: '💻 Exercise: Human in the Loop with a Frontend Tool',
        items: [
          'Put the user in the loop with a frontend tool, then find where that approach stops being enough.',
        ],
      },
      {
        title: '👨🏻‍🏫 Interrupts: Durable Human in the Loop',
        items: [
          'Suspending the run agent-side: interrupt / suspend.',
          'Checkpoints / snapshots: where a paused run sleeps.',
          'The round-trip: suspend, approve, resume. Surviving a refresh.',
          'Confirming exact args, not intent.',
        ],
      },
      {
        title: '💻 Exercise: Enforcing Confirmation on the Server',
        items: [
          'Move the confirmation where it cannot be bypassed, and make a paused run survive a page refresh.',
        ],
      },
      {
        title: '👨🏻‍🏫 Threads: Persistence & Recovery',
        items: [
          'Persistence and multi-session conversations.',
          'Resuming a thread after refresh or crash.',
          'Stream errors: when the wire drops mid-answer.',
          'Cancellation: aborting a run cleanly.',
        ],
      },
      {
        title: '💻 Exercise: Kill the Stream, Cancel a Run, Then Resume',
        items: [
          'Break the connection on purpose, abort a run cleanly, and bring the thread back from where it left off.',
        ],
      },
      {
        title: '👨🏻‍🏫 Securing the Agent Boundary',
        items: [
          'Prompt injection.',
          'Sensitive information disclosure.',
          'Guardrails: moderating streams in flight.',
          'Tool permission scoping: least privilege per user and role.',
        ],
      },
      {
        title: '💻 Exercise: Break the Agent — Red-Team, Then Harden',
        items: [
          'Attack your own agent with injected content, then close the holes you just opened.',
        ],
      },
      {
        title: '👨🏻‍🏫 Authentication & Authorization',
        items: [
          'Propagating user identity to the agent runtime.',
          'Scoping tools per user.',
          'Securing the runtime endpoint.',
        ],
      },
      {
        title: '💻 Exercise: Locking Down the Runtime',
        items: [
          'Carry real identity through to the agent, scope its tools to that user, and close the endpoint behind it.',
        ],
      },
      {
        title: '👨🏻‍🏫 Performance & Cost',
        items: ['Where the tokens go.', 'Cutting cost, boosting speed.'],
      },
      {
        title: '💻 Exercise: Optimize Cost and Performance',
        items: [
          'Measure where your tokens actually go, then cut the bill without making the feature feel slower.',
        ],
      },
      {
        title: '👨🏻‍🏫 Generative UI with A2UI',
        items: [
          'Declarative UI-as-data: JSONL streaming.',
          'The Angular renderer.',
          'A2UI as a security model: trusted catalog, JSON-not-code.',
          'A2UI recovery loop.',
        ],
      },
      {
        title: '💻 Exercise: Rendering A2UI with Your Design System',
        items: [
          'Plug your own components into the renderer and let the agent compose them.',
        ],
      },
      {
        title: '👨🏻‍🏫 Catalog Design',
        items: [
          'Catalog granularity: atomic vs composed components.',
          'Fixed vs dynamic UI: a decision framework.',
        ],
      },
      {
        title: '💻 Exercise: Designing and Exposing a Catalog',
        items: [
          'Pick your granularity, expose the catalog, and see what the agent does with it.',
        ],
      },
      {
        title: '👨🏻‍🏫 Beyond the Chat Surface',
        items: [
          'Agent-driven UI in the main app.',
          'Actions: wiring user interactions back to the agent.',
        ],
      },
      {
        title: '💻 Exercise: Escaping the Chat Surface',
        items: [
          'Move agent-driven UI into the main app, and wire interactions on it back to the agent.',
        ],
      },
      {
        title: '👨🏻‍🏫 Defining Your Agentic Strategy',
        items: [
          'Which features deserve an agent.',
          'Picking the surface per use case: chat, embedded, or none.',
          'Risk-tiering your tools: auto-run, confirm, forbid.',
          'A takeaway decision tree.',
          'Evals, observability & testing are covered in the companion workshop: “Trusting your AI apps: A Testing and Eval Strategy”.',
        ],
      },
      {
        title: '💻 Exercise: Build the Decision Tree',
        items: [
          'When to go agentic, which surface, which tier — for your own codebase, not a sample app.',
        ],
      },
    ],
  },
});
