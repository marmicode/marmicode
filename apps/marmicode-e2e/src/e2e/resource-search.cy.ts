import { ResourceCardHarness } from '@marmicode/resource-feature-search/testing';
import { getAllHarnesses } from '@jscutlery/cypress-harness';

describe('resource search', () => {
  it('should list resources', () => {
    cy.location('pathname').should('eq', '/learn/everything');
    /* Wait for resources to appear. */
    getAllHarnesses(ResourceCardHarness).should('have.length.gt', 10);
  });

  it('should filter resources by skill', () => {
    cy.get('a').contains('Angular AOT Testing').click();
    getAllHarnesses(ResourceCardHarness).should('have.length', 1);
  });
});
