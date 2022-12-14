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

/* Cf. https://github.com/percy/percy-cypress/blob/master/index.js */
Cypress.Commands.add('snapshot', (name = undefined) => {
  name = name || (cy as any).state('runnable').fullTitle();
  const fileName = name.replace(/ /g, '-').toLowerCase();

  const options = {
    widths: [360, 768, 1280],
  };

  return cy.document({ log: false }).then((dom) => {
    const domSnapshot = serializeDOM({ ...options, dom });
    return cy.writeFile(
      `./__percy_snapshots__/${fileName}.json`,
      JSON.stringify({
        domSnapshot,
        name,
        url: dom.URL,
        ...options,
      })
    );
  });
});

