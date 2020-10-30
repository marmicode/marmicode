describe('FrameComponent', () => {
  it('should apply horizontal scroll if code overflows', () => {
    cy.visit('/iframe.html?id=frame--overflow');
    cy.get('[data-role="code-block"]').should('contain', '# Get a farm.');
    cy.snapshot();
  });

  it('should highlight code on click', () => {
    cy.visit('/iframe.html?id=frame--highlight');
    cy.get('[data-role="code-highlight"]').should('not.exist');
    cy.snapshot();
    cy.get('[data-role="highlight-link"]').first().click();
    cy.get('[data-role="code-highlight"]').should('exist');
    cy.snapshot();
  });
});
