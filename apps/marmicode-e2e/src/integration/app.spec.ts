describe('marmicode', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should list resources', () => {
    cy.location('pathname').should('eq', '/learn/everything');
    /* Wait for resources to appear. */
    cy.get('mc-resource-card').its('length').should('eq', 11);
    cy.snapshot();
  });
});
