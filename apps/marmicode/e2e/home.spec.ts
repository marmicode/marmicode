import { test as base, expect, Page } from '@playwright/test';

const test = base.extend<{ glove: HomeGlove }>({
  glove: async ({ page }, use) => {
    await use(new HomeGlove(page));
  },
});

test.describe('home', () => {
  test('WIP route serves the new home', async ({ glove }) => {
    await glove.goto('/');
    await expect(glove.heading("Let's Cook Better Apps!")).toBeVisible();

    await glove.enableWip();
    await glove.goto('/');
    await expect(glove.heading("Pick what you're hungry for.")).toBeVisible();
  });
});

class HomeGlove {
  constructor(private _page: Page) {}

  async enableWip() {
    await this._page.addInitScript(() => localStorage.setItem('wip', 'true'));
  }

  /**
   * This does not wait for the `load` event:
   * it depends on third parties (e.g. chat widget).
   */
  async goto(url: string) {
    await this._page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  heading(name: string) {
    return this._page.getByRole('heading', { name });
  }
}
