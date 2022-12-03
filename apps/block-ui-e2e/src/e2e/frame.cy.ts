describe('FrameComponent', () => {
  it('should apply horizontal scroll if code overflows', () => {
    cy.visit('/iframe.html?id=blockgroup--overflow');
    cy.getByDataRole('code-block').should('contain', '# Get a farm.');
    cy.snapshot();
  });

  describe('with highlight links', () => {
    beforeEach(() => cy.visit('/iframe.html?id=blockgroup--highlight'));

    it('should not highlight code until click', () => {
      cy.getByDataRole('code-highlight').should('not.exist');
      cy.snapshot();
    });

    it('should highlight code on click', () => {
      cy.getByDataRole('highlight-link').first().click();
      cy.getByDataRole('code-highlight').should('exist');
      cy.snapshot();
    });
  });
});
