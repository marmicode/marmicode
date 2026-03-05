import { test as base, expect, Page } from '@playwright/test';

const test = base.extend<{ glove: WorskhopsGlove }>({
  glove: async ({ page }, use) => {
    await use(new WorskhopsGlove(page));
  },
});

class WorskhopsGlove {
  constructor(private _page: Page) {}

  goto() {
    return this._page.goto('/workshops');
  }

  /**
   * Selects a language filter button.
   */
  languageFilter(name: 'All' | 'English' | 'French') {
    return this._page.getByRole('radio', { name });
  }

  workshopTitle() {
    return this._page.getByRole('heading', { level: 3 });
  }
}

test.describe('workshops', () => {
  test('shows all workshops', async ({ glove }) => {
    await glove.goto();

    await expect(glove.workshopTitle()).toContainText([
      'Pragmatic Angular Testing',
      'Test Angular Pragmatique',
    ]);
  });

  test('go to workshop when clicking on title', async ({ glove, page }) => {
    await glove.goto();

    await glove
      .workshopTitle()
      .filter({ hasText: 'Pragmatic Angular Testing' })
      .first()
      .click();

    await expect
      .poll(() => page.title())
      .toContain('Pragmatic Angular Testing');
  });

  test('filters workshops by language', async ({ glove }) => {
    await glove.goto();

    await glove.languageFilter('French').click();
    await expect(glove.workshopTitle()).toContainText([
      'Test Angular Pragmatique',
    ]);
    await expect(glove.workshopTitle()).not.toContainText([
      'Pragmatic Angular Testing',
    ]);
  });
});
