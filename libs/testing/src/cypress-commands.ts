/// <reference types="cypress" />
import '@percy/cypress';

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

Cypress.Commands.add('snapshot', (name = undefined) => {
  cy.percySnapshot(name, {
    widths: [360, 768, 1280],
  });
});
