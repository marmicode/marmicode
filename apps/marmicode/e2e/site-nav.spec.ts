import { test as base, expect, Page } from '@playwright/test';

const test = base.extend<{ glove: SiteNavGlove }>({
  glove: async ({ page }, use) => {
    await use(new SiteNavGlove(page));
  },
});

test.describe('site nav', () => {
  test.fixme('nav fits a 320px viewport', async ({ glove }) => {
    await glove.setViewportSize({ width: 320, height: 640 });
    await glove.goto('/');

    await expect(glove.contactLink()).toBeVisible();
    await expect.poll(() => glove.hasHorizontalScroll()).toBe(false);
  });
});

class SiteNavGlove {
  constructor(private _page: Page) {}

  async setViewportSize(size: { width: number; height: number }) {
    await this._page.setViewportSize(size);
  }

  /**
   * This does not wait for the `load` event:
   * it depends on third parties (e.g. chat widget).
   */
  async goto(url: string) {
    await this._page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * On phones, the button is shortened from "Contact me" to "Contact".
   */
  contactLink() {
    return this._page
      .locator('mc-site-nav')
      .getByRole('link', { name: 'Contact', exact: true });
  }

  hasHorizontalScroll() {
    return this._page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
  }
}
