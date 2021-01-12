describe('BlogPostComponent', () => {
  it('should show blog', () => {
    cy.visit('/iframe.html?id=blogpost--default');
    cy.snapshot();
  });
});
