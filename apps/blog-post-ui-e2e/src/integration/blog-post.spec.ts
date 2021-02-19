describe('BlogPostComponent', () => {
  it('should show blog', () => {
    cy.visit('/iframe.html?id=blogpost--default');
    cy.snapshot();
  });

  xit('🚧 should show video', () => {
    cy.visit('/iframe.html?id=blogpost--video');
    cy.snapshot();
  });
});
