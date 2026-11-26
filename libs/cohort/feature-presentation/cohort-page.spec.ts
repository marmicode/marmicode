import { TestBed } from '@angular/core/testing';
import { provideSiteConfig } from '@marmicode/shared/core';
import { describe, expect, it, vi } from 'vitest';
import { CohortPage } from './cohort-page.ng';

describe(CohortPage, () => {
  it('sets the page title', async () => {
    mountCohortPage();

    await expect
      .poll(() => document.title)
      .toBe(
        'From Drift to Trust: Test-First Agentic Engineering for Angular | Marmicode',
      );
  });

  it('sets the canonical link to the cohort URL', async () => {
    const { getCanonicalUrls } = mountCohortPage();

    await expect
      .poll(() => getCanonicalUrls())
      .toEqual([
        'https://marmicode.io/cohorts/from-drift-to-trust-for-angular',
      ]);
  });

  it('shows the price in the banner', async () => {
    const { getBannerText } = mountCohortPage();

    await expect
      .poll(() => getBannerText())
      .toContain('🐣 Early Bird starts at €1,570');
  });

  it('shows when the next cohort starts in the banner', async () => {
    const { getBannerText } = mountCohortPage();

    await expect.poll(() => getBannerText()).toContain('NEXT COHORT');
    expect(getBannerText()).toContain('EARLY 2027');
  });

  it('mentions the French cohort and OPCO funding in the banner', async () => {
    const { getBannerText } = mountCohortPage();

    await expect
      .poll(() => getBannerText())
      .toContain('Also available in French, fundable up to 100% via OPCO.');
  });

  it('shows how the cohort is organized: the video course first, a live session every week, and the community', async () => {
    const { getSchedule } = mountCohortPage();

    await expect
      .poll(() => getSchedule())
      .toEqual([
        {
          when: 'Before week 1',
          cards: [
            [
              'Video course',
              '🎬',
              'Pragmatic Angular Testing, at your own pace',
            ],
          ],
        },
        {
          when: 'Every week: Live session, 3 h',
          cards: [
            ['Week 1', '🧪', "Tests Agents Can't Cheat"],
            ['Week 2', '👀', 'Give the Agent Eyes'],
            ['Week 3', '🧭', 'The Charted Coding Cycle'],
            ['Week 4', '⚓', 'The Harness'],
            ['Week 5', '🔬', 'Proving It Holds'],
            ['Week 6', '🔁', 'The Charted Loop'],
          ],
        },
        {
          when: 'Between sessions',
          cards: [['Discord', '💬', 'Private community, open all week']],
        },
      ]);
  });

  it('shows the program of the first week', async () => {
    const { getOpenedPrograms } = mountCohortPage();

    await expect
      .poll(() => getOpenedPrograms())
      .toEqual([
        {
          title: "🧪 Week 1: Tests Agents Can't Cheat",
          items: [
            'Why almost-right code erodes trust, and what a test must do to stop it.',
            'A test strategy for agent-written code: how wide each test goes, what to fake, and how a contract keeps the fake honest.',
          ],
          outcome:
            'You leave with a contract-tested fake, and a test strategy for one feature of your own app.',
        },
      ]);
  });

  it('shows the program of another week when its card is clicked', async () => {
    const { clickWeek, getOpenedPrograms } = mountCohortPage();

    await clickWeek('Week 4');

    await expect
      .poll(() => getOpenedPrograms())
      .toEqual([
        {
          title: '⚓ Week 4: The Harness',
          items: [
            "Back pressure and guardrails the agent can't quietly bypass.",
            'The agent catches its own mistakes before it hands control back to you.',
          ],
          outcome:
            'You leave with checks wired into your agent that run on every change, including your architecture boundaries.',
        },
      ]);
  });

  it('links to the waitlist form at the top and at the bottom of the page', async () => {
    const { getLinkUrls } = mountCohortPage();

    await expect
      .poll(() => getLinkUrls('JOIN WAITLIST'))
      .toEqual([
        'https://docs.google.com/forms/d/1rQfN5CjQnxDJs6yoSKVMahPOVeYEX9DjDC7vEeRB-eU/viewform',
        'https://docs.google.com/forms/d/1rQfN5CjQnxDJs6yoSKVMahPOVeYEX9DjDC7vEeRB-eU/viewform',
      ]);
  });
});

function mountCohortPage() {
  TestBed.configureTestingModule({
    providers: [provideSiteConfig({ origin: 'https://marmicode.io' })],
  });

  /* The returned fixture is deliberately ignored. */
  TestBed.createComponent(CohortPage);

  return {
    getCanonicalUrls: () =>
      Array.from(document.head.querySelectorAll('link'))
        .filter((link) => link.rel === 'canonical')
        .map((link) => link.href),
    getBannerText: () =>
      document.querySelector('mc-cohort-hero')?.textContent ?? '',
    /* The tracks of the schedule: when each one happens, and the parts of its cards. */
    getSchedule: () =>
      Array.from(document.querySelectorAll('mc-cohort-schedule section')).map(
        (track) => ({
          when: track.querySelector('h3')?.textContent?.trim(),
          cards: Array.from(track.querySelectorAll('.card')).map((card) =>
            Array.from(card.children).map((part) => part.textContent?.trim()),
          ),
        }),
      ),
    /* The page is not rendered yet when the test starts, so this waits for the card. */
    clickWeek: async (label: string) => {
      const card = await vi.waitUntil(() =>
        Array.from(
          document.querySelectorAll<HTMLButtonElement>(
            'mc-cohort-schedule button',
          ),
        ).find((button) => button.textContent?.includes(label)),
      );
      card.click();
    },
    /* The programs that are not hidden: there is one per week, and a single one is opened. */
    getOpenedPrograms: () =>
      Array.from(
        document.querySelectorAll(
          'mc-cohort-schedule [role="region"]:not([hidden])',
        ),
      ).map((program) => ({
        title: program.querySelector('h4')?.textContent?.trim(),
        items: Array.from(program.querySelectorAll('li')).map((item) =>
          item.textContent?.trim(),
        ),
        outcome: program.querySelector('.outcome')?.textContent?.trim(),
      })),
    getLinkUrls: (text: string) =>
      Array.from(document.querySelectorAll('a'))
        .filter((link) => link.textContent?.includes(text))
        .map((link) => link.href),
  };
}
