import { test as base, expect, Page } from '@playwright/test';

const test = base.extend<{ glove: WorkshopPageGlove }>({
  glove: async ({ page }, use) => {
    await use(new WorkshopPageGlove(page));
  },
});

test.describe('workshop page', () => {
  test('sticky booking bar', async ({ glove }) => {
    await glove.goto('pragmatic-angular-testing');

    await expect(glove.bookBar()).toBeHidden();

    await glove.scrollToSessions();
    await expect(glove.bookBar()).toBeVisible();

    await glove.scrollToClosingSection();
    await expect(glove.bookBar()).toBeHidden();
  });
});

class WorkshopPageGlove {
  constructor(private _page: Page) {}

  /**
   * This does not wait for the `load` event:
   * it depends on third parties (e.g. chat widget).
   */
  async goto(workshopId: string) {
    await this._page.goto(`/trainings/${workshopId}`, {
      waitUntil: 'domcontentloaded',
    });
  }

  bookBar() {
    return this._page.locator('mc-workshop-book-bar');
  }

  /* The sessions section sits right below the overview, past the hero. */
  async scrollToSessions() {
    await this._page.locator('#sessions').scrollIntoViewIfNeeded();
  }

  async scrollToClosingSection() {
    await this._page.locator('mc-closing-section').scrollIntoViewIfNeeded();
  }
}
