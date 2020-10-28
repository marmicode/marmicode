describe('CodeBlockComponent', () => {
  it('should highlight lines', () => {
    cy.visit('/iframe.html?id=codeblock--highlight');
    cy.percySnapshot(undefined, {
      widths: [360, 768, 1280],
    });
  });
});
