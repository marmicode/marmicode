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
   * Selects a tag from the tags at the top of the page.
   */
  tag(tag: string) {
    return this._page.getByRole('option', { name: tag }).first();
  }

  /**
   * Selects a tag within a workshop card.
   */
  workshopTag({ title, tag }: { title: string; tag: string }) {
    return this._page
      .getByRole('article')
      .filter({ has: this.workshopTitle().filter({ hasText: title }) })
      .getByRole('listbox')
      .getByRole('option', { name: tag });
  }

  workshopTitle() {
    return this._page.getByRole('heading', { level: 3 });
  }
}

test.describe('workshops', () => {
  test('shows all workshops', async ({ glove }) => {
    await glove.goto();

    await expect(glove.workshopTitle()).toContainText([
      'Pragmatic Angular Testing Workshop',
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
      .toContain('Pragmatic Angular Testing Workshop');
  });

  test('does not go to workshop when clicking on tag', async ({
    glove,
    page,
  }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(true, 'Work in progress');
    await glove.goto();

    await glove
      .workshopTag({
        title: 'Pragmatic Angular Testing Workshop',
        tag: 'Testing',
      })
      .click();

    /* Checking that the tag is clicked sounds like a good idea,
     * but Playwright is faster than the browser navigation.
     * So it can see the tag changed before the navigation happens.
     * This can cause a false negative. */
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState('networkidle');

    await expect.poll(() => page.title()).toBe('Workshops | Marmicode');
  });
});
