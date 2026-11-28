import { externalLinks } from '@marmicode/shared/router-helpers';
import heroPictureUri from './coach.webp';

export interface CoachingOffering {
  benefits: CoachingBenefit[];
  bookCallUrl: string;
  ctaDescription: string;
  ctaTitle: string;
  description: string;
  heroPictureUri: string;
  philosophyContent: string;
  /** `end` is highlighted. */
  philosophyTitle: { start: string; end: string };
  priceLabel: string;
  title: string;
}

export interface CoachingBenefit {
  headline: string;
  detail: string;
}

export const COACHING: CoachingOffering = {
  title: 'Monthly Team Coaching',
  description:
    'A monthly partnership to let your agents ship faster without trading away quality or trust. Together, we build the tests, the harness and the methodology that keep it that way.',
  priceLabel: 'Starting at €2500 / month',
  heroPictureUri,
  benefits: [
    {
      headline: 'Deep-dive session',
      detail:
        '4 hours, once a month. One focused working session on whatever matters most right now: how your team works with agents, your testing strategy, your harness, an architecture decision, or hands-on programming with you and your agents. Includes my prep and the recorded session, so you can replay it.',
    },
    {
      headline: 'Async support between sessions',
      detail:
        'Up to 8 requests a month. Drop a focused question, from an architecture issue to the best testing and eval strategy for a feature, and get a considered reply within 48 hours.',
    },
    {
      headline: 'A written follow-up report',
      detail:
        'Concrete, prioritized recommendations after every session, so you walk away with a clear plan, not just generated notes.',
    },
  ],
  philosophyTitle: {
    start: 'More than advice,',
    end: 'a team transformation',
  },
  philosophyContent: `This is not open-ended consulting. It's a simple rhythm: one four-hour deep-dive each month, async support in between, and a written report after every session.

Agents write code faster than any team can review it. The code is almost right, the tests are green because the agent edited them until they passed, and quality quietly drifts. Together, we replace that drift with trust you can explain: tests agents can't game, a harness they can't quietly bypass, and loops that know when they are done and when they are stuck. Each change has one precise intent, so you review what matters instead of a wall of diff.

The goal is not to create dependency. You leave with a methodology your team owns, sharper technical decisions, and practices that keep your codebase healthy for the long run, whoever or whatever writes the code.`,
  ctaTitle: 'Make this the quarter your team ships code it can trust',
  ctaDescription:
    'Three months is long enough to build the tests, the harness and the habits that keep quality high as agents take on more of the work, and short enough to prove it pays for itself. You work directly with me the whole way: a Google Developer Expert and Nx Champion with nearly 20 years building and improving real software systems. I only take on a few partnerships at a time, so spots are limited.',
  bookCallUrl: externalLinks.scheduleCallUrl,
};
