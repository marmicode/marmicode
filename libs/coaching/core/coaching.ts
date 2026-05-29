import { externalLinks } from '@marmicode/shared/router-helpers';
import heroPictureUri from './coach.webp';

export interface CoachingOffering {
  benefits: string[];
  bookCallUrl: string;
  ctaDescription: string;
  ctaTitle: string;
  description: string;
  heroPictureUri: string;
  philosophyContent: string;
  philosophyTitle: string;
  priceLabel: string;
  title: string;
}

export const COACHING: CoachingOffering = {
  title: 'Monthly Team Coaching',
  description:
    'A focused monthly partnership that charts a steadier path to predictable, stable delivery — keeping the bar high even as AI writes more of the code.',
  priceLabel: 'Starting at €2500 / month',
  heroPictureUri,
  benefits: [
    'Deep-dive session — 4 hours, once a month. One focused working session on whatever moves the needle most: a specific technical problem, an architecture decision, a codebase audit, a technical roadmap, or hands-on pair programming. Includes my prep and the recorded session, so you can replay it.',
    'Async support between sessions — up to 8 requests a month. Drop a focused question or a PR to review (kept to a reasonable size, under ~500 lines) and get a considered reply within 48 hours.',
    'A written follow-up report — concrete, prioritized recommendations after every session so you walk away with a clear plan, not just notes.',
  ],
  philosophyTitle: 'More than advice — a team that needs me less over time',
  philosophyContent: `This is not open-ended consulting. It's a simple rhythm: one four-hour deep-dive each month, async support in between, and a written report after every session.

We work on whatever moves the needle most for your team — architecture, testing strategy, delivery flow, code quality, or hands-on pair programming on a real problem. The goal is not to create dependency, but to leave you with sharper technical decisions, clearer priorities, and practices your team can sustain without me.

Over three months, you get enough momentum to fix what's actually slowing delivery down — and enough proof that the partnership pays for itself.`,
  ctaTitle: 'Make this the quarter your delivery gets predictable',
  ctaDescription:
    "Three months is long enough to fix what's actually slowing your team down — and short enough to prove it pays for itself. You work directly with me the whole way: a Google Developer Expert and Nx Champion with nearly 20 years building and improving real software systems. I only take on a few partnerships at a time, so spots are limited.",
  bookCallUrl: externalLinks.scheduleCallUrl,
};
