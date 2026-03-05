import { test as base, expect, Page } from '@playwright/test';

const test = base.extend<{ glove: WorskhopDetailGlove }>({
  glove: ({ page }, use) => use(new WorskhopDetailGlove(page)),
});

test.describe('workshop detail', () => {
  test('shows workshop info', async ({ glove, page }) => {
    test.slow();
    await glove.goto('pragmatic-angular-testing-full-course');
    await expect(page).toHaveScreenshot({ fullPage: true });
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
        'http://localhost:4200/workshops/pragmatic-angular-testing-full-course',
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
        'http://localhost:4200/workshops/pragmatic-angular-testing-full-course',
      );
    await expect
      .soft(alternateLinks.nth(2))
      .toHaveAttribute('hreflang', 'x-default');
    await expect
      .soft(alternateLinks.nth(2))
      .toHaveAttribute(
        'href',
        'http://localhost:4200/workshops/pragmatic-angular-testing-full-course',
      );
  });
});

class WorskhopDetailGlove {
  constructor(private _page: Page) {}

  goto(workshopId: string) {
    return this._page.goto(`/workshops/${workshopId}`);
  }
}
