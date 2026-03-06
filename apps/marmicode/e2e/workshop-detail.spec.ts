import { test as base, expect, Page } from '@playwright/test';

const test = base.extend<{ glove: WorkshopDetailGlove }>({
  glove: ({ page }, use) => use(new WorkshopDetailGlove(page)),
});

test.describe('workshop detail', () => {
  test('shows workshop info', async ({ browserName, glove, page }) => {
    /* Skip WebKit for now because it's flaky on CI: "Failed to take two consecutive stable screenshots." */
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(!!process.env.CI && browserName === 'webkit', 'Skip on WebKit');

    test.slow();

    await glove.goto('pragmatic-angular-testing');

    /* Wait for luma sessions to be loaded. */
    await page
      .frame({ url: (u) => u.origin === 'https://luma.com' })!
      .getByText('Pragmatic Angular Testing')
      .waitFor();

    await expect(page).toHaveScreenshot({
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

  test('sets the page language to the workshop language', async ({
    glove,
    page,
  }) => {
    await glove.goto('test-angular-pragmatique');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });

  test('sets the right canonical and alternate link tags in head', async ({
    glove,
    page,
  }) => {
    await glove.goto('test-angular-pragmatique');

    // Assert that a canonical link tag exists in the document head
    const canonicalLink = page.locator('head link[rel="canonical"]');
    const alternateLinks = page.locator('head link[rel="alternate"]');
    await expect
      .soft(canonicalLink)
      .toHaveAttribute(
        'href',
        'http://localhost:4200/workshops/pragmatic-angular-testing',
      );
    await expect.soft(alternateLinks).toHaveCount(3);
    await expect.soft(alternateLinks.nth(0)).toHaveAttribute('hreflang', 'fr');
    await expect
      .soft(alternateLinks.nth(0))
      .toHaveAttribute(
        'href',
        'http://localhost:4200/workshops/test-angular-pragmatique',
      );
    await expect.soft(alternateLinks.nth(1)).toHaveAttribute('hreflang', 'en');
    await expect
      .soft(alternateLinks.nth(1))
      .toHaveAttribute(
        'href',
        'http://localhost:4200/workshops/pragmatic-angular-testing',
      );
    await expect
      .soft(alternateLinks.nth(2))
      .toHaveAttribute('hreflang', 'x-default');
    await expect
      .soft(alternateLinks.nth(2))
      .toHaveAttribute(
        'href',
        'http://localhost:4200/workshops/pragmatic-angular-testing',
      );
  });
});

class WorkshopDetailGlove {
  constructor(private _page: Page) {}

  goto(workshopId: string) {
    return this._page.goto(`/workshops/${workshopId}`);
  }
}
