import { test as base, expect, Page } from '@playwright/test';

const test = base.extend<{ glove: RemovedPagesGlove }>({
  glove: async ({ page }, use) => {
    await use(new RemovedPagesGlove(page));
  },
});

test.describe('removed pages', () => {
  test.fixme('removed pages redirect', async ({ glove }) => {
    await glove.goto('/services');
    await expect.poll(() => glove.pathname()).toBe('/coaching');

    await glove.goto('/recipe/anything/step');
    await expect.poll(() => glove.pathname()).toBe('/learn/everything');

    await glove.goto('/tutorial/anything');
    await expect.poll(() => glove.pathname()).toBe('/learn/everything');
  });
});

class RemovedPagesGlove {
  constructor(private _page: Page) {}

  /**
   * This does not wait for the `load` event:
   * it depends on third parties (e.g. chat widget).
   */
  async goto(url: string) {
    await this._page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  pathname() {
    return new URL(this._page.url()).pathname;
  }
}
