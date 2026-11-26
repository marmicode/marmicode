import { TestBed } from '@angular/core/testing';
import { provideSiteConfig } from '@marmicode/shared/core';
import { describe, expect, it } from 'vitest';
import { CohortPage } from './cohort-page.ng';

describe(CohortPage, () => {
  it('sets the page title', async () => {
    mountCohortPage();

    await expect
      .poll(() => document.title)
      .toBe(
        'From Drift to Trust: a 6-week cohort for Angular developers | Marmicode',
      );
  });

  it('sets the canonical link to the cohort URL', async () => {
    const { getCanonicalUrls } = mountCohortPage();

    await expect
      .poll(() => getCanonicalUrls())
      .toEqual([
        'https://marmicode.io/cohorts/from-drift-to-trust-with-angular',
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

  it('lists the six weeks in order', async () => {
    const { getProgramTitles } = mountCohortPage();

    await expect
      .poll(() => getProgramTitles())
      .toEqual([
        "🧪 Week 1: Tests Agents Can't Cheat",
        '👀 Week 2: Give the Agent Eyes',
        '🧭 Week 3: The Charted Coding Cycle',
        '⚓ Week 4: The Harness',
        '🔬 Week 5: Proving It Holds',
        '🔁 Week 6: The Charted Loop',
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
    getProgramTitles: () =>
      Array.from(
        document.querySelectorAll('mc-training-agenda mat-panel-title'),
      ).map((title) => title.textContent?.trim()),
    getLinkUrls: (text: string) =>
      Array.from(document.querySelectorAll('a'))
        .filter((link) => link.textContent?.includes(text))
        .map((link) => link.href),
  };
}
