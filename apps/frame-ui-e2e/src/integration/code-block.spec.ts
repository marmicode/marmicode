describe('CodeBlockComponent', () => {
  it('should highlight lines', () => {
    cy.visit('/iframe.html?id=codeblock--highlight');
    cy.snapshot();
  });
});
