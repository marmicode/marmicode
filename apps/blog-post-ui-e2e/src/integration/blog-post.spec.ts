describe('BlogPostComponent', () => {
  it('should show blog', () => {
    cy.visit('/iframe.html?id=blogpost--default');
    cy.snapshot();
  });

  it('should show video', () => {
    cy.visit('/iframe.html?id=blogpost--video');
    cy.snapshot();
  });
});
