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

  it('should dispatch event on click', () => {
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
});
