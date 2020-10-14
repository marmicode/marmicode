describe('FrameComponent', () => {
  it('should apply horizontal scroll if code overflows', () => {
    cy.visit('/iframe.html?id=frame--overflow');
    cy.get('[data-role="code-block"]', { includeShadowDom: true }).should(
      'contain',
      '# Get a farm.'
    );
    cy.percySnapshot(undefined, {
      enableJavaScript: true,
      widths: [360, 768, 1280],
    });
  });
});
