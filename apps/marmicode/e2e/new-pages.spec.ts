import { test as base, expect, Page } from '@playwright/test';

const test = base.extend<{ glove: NewPagesGlove }>({
  glove: async ({ page }, use) => {
    await use(new NewPagesGlove(page));
  },
});

test.describe('new pages', () => {
  test('new pages without WIP mode', async ({ glove }) => {
    /* This test renders six pages on the dev server. */
    test.slow();

    for (const { url, heading } of [
      { url: '/', heading: 'Trust, baked in.' },
      {
        url: '/workshops',
        heading: 'Hands-on training, from testing to agentic dev.',
      },
      {
        url: '/workshops/pragmatic-angular-testing',
        heading: 'Pragmatic Angular Testing Workshop',
      },
      {
        url: '/cohorts',
        heading:
          'From Drift to Trust: Test-First Agentic Engineering for Angular',
      },
      { url: '/coaching', heading: 'Monthly Team Coaching' },
      {
        url: '/learn/everything',
        heading: 'Recipes, talks & tips, on the house.',
      },
    ]) {
      await glove.goto(url);

      await expect.soft(glove.heading(heading), url).toBeVisible();
      await expect.soft(glove.siteNav(), url).toBeVisible();
      await expect.soft(glove.oldNav(), url).toHaveCount(0);
    }
  });
});

class NewPagesGlove {
  constructor(private _page: Page) {}

  /**
   * This does not wait for the `load` event:
   * it depends on third parties (e.g. chat widget).
   */
  async goto(url: string) {
    await this._page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  heading(name: string) {
    return this._page.getByRole('heading', { level: 1, name, exact: true });
  }

  /* The floating nav. */
  siteNav() {
    return this._page.locator('mc-site-nav header');
  }

  oldNav() {
    return this._page.locator('mc-nav');
  }
}
