describe('marmicode', () => {
  beforeEach(() => cy.visit('/'));

  it('should list resources', () => {
    cy.location('pathname').should('eq', '/learn/everything');
    cy.snapshot();
  });
});
