describe('FrameComponent', () => {
  it('should match image snapshot', () => {
    cy.visit('/iframe.html?id=frame--overflow');
  });
});
