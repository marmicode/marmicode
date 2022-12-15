/// <reference types="cypress" />
/* @hack fix "Could not find a declaration file for module"
 * as `allowJs: true` was not enough. */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
import serializeDOM from '@percy/dom';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      getByDataRole<E extends HTMLElement>(
        dataRole: string
      ): Chainable<JQuery<E>>;

      snapshot(name?: string): void;
    }
  }
}

Cypress.Commands.add('getByDataRole', (dataRole) =>
  cy.get(`[data-role="${dataRole}"]`)
);

/**
 * The main purpose of this command is to capture the DOM snapshot
 * in a file in order to upload it later to Percy.
 *
 * We had to manually inline styles and images.
 * This is the only way we found to be able to cache Cypress test
 * results with Nx but still be able to use Percy and upload all
 * snapshots in the main branch.
 *
 * The main problem we met is that Percy's snapshot
 * has a discovery phase which is taken care of by the local
 * percy server (@percy/cli) which will automatically start
 * uploading the build to Percy once the discovery phase is done.
 *
 * Cf. https://docs.percy.io/docs/debugging-sdks
 */
Cypress.Commands.add('snapshot', (name = undefined) => {
  name = name ?? Cypress.currentTest.titlePath.join(' ');
  const fileName = name.replace(/ /g, '-').toLowerCase();

  const options = {
    widths: [360, 768, 1280],
  };

  return cy.document({ log: false }).then(async (document) => {
    /* Inline styles. */
    for (const el of Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    )) {
      const url = el.getAttribute('href');
      if (!isSameOrigin({ url, document })) {
        continue;
      }

      const res = await fetch(url);
      const css = await res.text();
      const style = document.createElement('style');
      style.innerHTML = css;
      el.parentNode?.insertBefore(style, el);
      el.parentNode?.removeChild(el);
    }

    /* Inline images. */
    for (const el of Array.from(document.querySelectorAll('img'))) {
      const url = el.getAttribute('src');
      if (!isSameOrigin({ url, document })) {
        continue;
      }

      const res = await fetch(url);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      el.src = await new Promise((resolve) =>
        reader.addEventListener('loadend', () =>
          resolve(reader.result as string)
        )
      );
    }

    /* Serialize dom with Percy. */
    const domSnapshot = serializeDOM({ ...options, dom: document });

    cy.writeFile(
      `./__percy_snapshots__/${fileName}.json`,
      JSON.stringify({
        domSnapshot,
        name,
        url: document.URL,
        ...options,
      })
    );
  });
});

function isSameOrigin({ url, document }: { url: string; document: Document }) {
  const origin = document.defaultView.origin;
  return url.startsWith(origin) || url.match(/^\/[^/]/);
}
