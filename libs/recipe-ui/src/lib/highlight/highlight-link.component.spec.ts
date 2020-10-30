import { HighlightLinkComponent } from './highlight-link.component';
import { HighlightZone } from './highlight-zone';

describe('Component', () => {
  let component: HighlightLinkComponent;
  let mockNativeElement: {
    dispatchEvent: jest.Mock;
  };

  beforeEach(() => {
    mockNativeElement = {
      dispatchEvent: jest.fn(),
    };
    component = new HighlightLinkComponent({
      nativeElement: mockNativeElement,
    });
    component.color = 'red';
    component.href = 'highlight://1,3-4';
  });

  it('should trigger highlight on click', () => {
    component.onClick();
    expect(mockNativeElement.dispatchEvent.mock.calls[0][0].detail).toEqual({
      color: 'red',
      sections: [
        {
          start: 1,
          end: 1,
        },
        {
          start: 3,
          end: 4,
        },
      ],
    } as HighlightZone);
  });

  xit('should trigger highlight on mouse enter', () => {
    // mouse enter
    // check event dispatch with zone
  });

  xit('should cancel highlight on mouse leave', () => {
    // mouse enter
    // reset mock
    // mouse leave
    // check event dispatch with null
  });

  xit('should not cancel highlight on mouse leave if clicked', () => {
    // mouse enter
    // mouse click
    // reset mock
    // mouse leave
    // check no event is dispatched
  });

  /**
   * This happens when user clicks, leaves and hovers again.
   */
  xit('should cancel highlight on mouse leave if clicked before enter', () => {
    // mouse click
    // mouse enter
    // reset mock
    // mouse leave
    // check event dispatch with null
  });
});
