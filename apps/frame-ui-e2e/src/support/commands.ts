// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import '@percy/cypress';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getByDataRole<E extends HTMLElement>(
        dataRole: string
      ): Chainable<JQuery<E>>;
      snapshot(name?: string): void;
    }
  }
}
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {
//   console.log('Custom command example: Login', email, password);
// });
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getByDataRole', (dataRole) =>
  cy.get(`[data-role="${dataRole}"]`)
);

Cypress.Commands.add('snapshot', (name = undefined) => {
  cy.percySnapshot(name, {
    widths: [360, 768, 1280],
  });
});
