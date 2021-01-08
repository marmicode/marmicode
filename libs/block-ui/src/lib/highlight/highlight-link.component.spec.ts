import { SimpleChange } from '@angular/core';
import { HighlightLinkComponent } from './highlight-link.component';
import { HighlightZone } from './highlight-zone';
import mock = jest.mock;

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
    component.ngOnChanges({
      href: new SimpleChange(null, component.href, true),
    });
  });

  it('should trigger highlight on click', () => {
    component.onClick();
    expect(mockNativeElement.dispatchEvent).toBeCalledTimes(1);
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

  it('should trigger highlight on mouse enter', () => {
    component.onMouseEnter();
    expect(mockNativeElement.dispatchEvent).toBeCalledTimes(1);
    expect(mockNativeElement.dispatchEvent.mock.calls[0][0].detail).toEqual({
      color: expect.any(String),
      sections: expect.any(Array),
    });
  });

  it('should cancel highlight on mouse leave', () => {
    component.onMouseEnter();
    mockNativeElement.dispatchEvent.mockReset();
    component.onMouseLeave();
    expect(mockNativeElement.dispatchEvent).toBeCalledTimes(1);
    expect(mockNativeElement.dispatchEvent.mock.calls[0][0].detail).toBe(null);
  });

  it('should not cancel highlight on mouse leave if clicked', () => {
    component.onMouseEnter();
    component.onClick();
    mockNativeElement.dispatchEvent.mockReset();
    component.onMouseLeave();
    expect(mockNativeElement.dispatchEvent).not.toBeCalled();
  });

  /**
   * This happens when user clicks, leaves and hovers again.
   */
  it('should cancel highlight on mouse leave if clicked before enter', () => {
    component.onClick();
    component.onMouseEnter();
    mockNativeElement.dispatchEvent.mockReset();
    component.onMouseLeave();
    expect(mockNativeElement.dispatchEvent).toBeCalledTimes(1);
    expect(mockNativeElement.dispatchEvent.mock.calls[0][0].detail).toBe(null);
  });
});
