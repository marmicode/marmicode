import { test as base, expect, Page } from '@playwright/test';

const test = base.extend<{ glove: WorkshopListGlove }>({
  glove: async ({ page }, use) => {
    await use(new WorkshopListGlove(page));
  },
});

test.describe('workshop list', () => {
  test('shows one card per workshop', async ({ glove }) => {
    await glove.goto();

    /* Without a language filter, each workshop shows its English version. */
    await expect(
      glove.workshopCardTitle('Pragmatic Angular Testing'),
    ).toHaveCount(1);
    await expect(
      glove.workshopCardTitle('Test Angular Pragmatique'),
    ).toHaveCount(0);
  });

  test('go to workshop when clicking on title', async ({ glove, page }) => {
    /* This test renders two pages: the list, then the workshop.
     * On the dev server, that does not fit in the default timeout on slow browsers. */
    test.slow();

    await glove.goto();

    await glove.workshopCardTitle('Pragmatic Angular Testing').click();

    await expect
      .poll(() => page.title())
      .toContain('Pragmatic Angular Testing');
  });

  test('filters workshops by language', async ({ glove }) => {
    await glove.goto();

    await glove.languageFilter('Français').click();
    await expect(
      glove.workshopCardTitle('Test Angular Pragmatique'),
    ).toHaveCount(1);
    await expect(
      glove.workshopCardTitle('Pragmatic Angular Testing'),
    ).toHaveCount(0);
  });
});

class WorkshopListGlove {
  constructor(private _page: Page) {}

  /**
   * This does not wait for the `load` event:
   * it depends on third parties (e.g. chat widget),
   * and it can take most of the test timeout on slow browsers.
   */
  goto() {
    return this._page.goto('/workshops', { waitUntil: 'domcontentloaded' });
  }

  /**
   * Selects a language filter button.
   */
  languageFilter(name: 'All languages' | 'English' | 'Français') {
    return this._page
      .getByRole('group', { name: 'Filter by language' })
      .getByRole('button', { name, exact: true });
  }

  /**
   * The video course has the same title as the workshop,
   * so this only looks at titles linking to a workshop page.
   */
  workshopCardTitle(title: string) {
    return this._page
      .getByRole('heading', { level: 3, name: title, exact: true })
      .filter({ has: this._page.locator('a[href^="/workshops/"]') });
  }
}
