import { Component, DebugElement, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SwipeDirective, SwipeModule } from './swipe.directive';

@Component({
  template: `
    <div
      data-role="container"
      mcSwipe
      (swipeLeft)="swipeLeft$.emit($event)"
      (swipeRight)="swipeRight$.emit($event)"
    >
      <div data-role="content">CONTENT</div>
    </div>
  `,
})
export class SwipeTestComponent {
  /* A property to propagate the event to our test. */
  swipeRight$ = new EventEmitter();
  swipeLeft$ = new EventEmitter();
}

describe('SwipeDirective', () => {
  let component: SwipeTestComponent;
  let fixture: ComponentFixture<SwipeTestComponent>;
  let containerEl: DebugElement;
  let contentEl: DebugElement;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [SwipeTestComponent],
      imports: [SwipeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    containerEl = fixture.debugElement.query(By.css('[data-role=container]'));
    contentEl = fixture.debugElement.query(By.css('[data-role=content]'));
  });

  it('should apply overflow hidden when swipe starts', () => {
    expect(containerEl.styles).not.toEqual(
      expect.objectContaining({
        overflow: 'hidden',
      })
    );

    triggerTouchEvent({ eventName: 'touchstart', clientX: 100 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 110 });

    expect(containerEl.styles).toEqual(
      expect.objectContaining({
        overflow: 'hidden',
      })
    );
  });

  it('should move content to right with padding', () => {
    triggerTouchEvent({ eventName: 'touchstart', clientX: 100 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 150 });

    expect(containerEl.styles).toEqual(
      expect.objectContaining({
        paddingLeft: '50px',
      })
    );
  });

  it('should reset position on touchend', () => {
    triggerTouchEvent({ eventName: 'touchstart', clientX: 100 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 150 });
    triggerTouchEvent({ eventName: 'touchend' });

    expect(containerEl.styles.paddingLeft).toEqual('');
  });

  it('should trigger swipeLeft event on swipe', () => {
    const observer = jest.fn();
    component.swipeLeft$.subscribe(observer);

    triggerTouchEvent({ eventName: 'touchstart', clientX: 100 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 50 });
    triggerTouchEvent({ eventName: 'touchend' });

    expect(observer).toBeCalledTimes(1);
  });

  it('should trigger swipeRight event on swipe', () => {
    const observer = jest.fn();
    component.swipeRight$.subscribe(observer);

    triggerTouchEvent({ eventName: 'touchstart', clientX: 100 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 150 });
    triggerTouchEvent({ eventName: 'touchend' });

    expect(observer).toBeCalledTimes(1);
  });

  function triggerTouchEvent({
    eventName,
    clientX,
  }: {
    eventName: 'touchstart' | 'touchmove' | 'touchend';
    clientX?: number;
  }) {
    const touches = clientX
      ? [
          {
            clientX,
          },
        ]
      : [];

    /* Dispatch global touchmove event on window manually. */
    if (['touchmove', 'touchend'].includes(eventName)) {
      window.dispatchEvent(
        new TouchEvent(eventName, {
          touches,
        } as TouchEventInit)
      );
    } else {
      containerEl.triggerEventHandler(eventName, {
        touches,
      });
    }
  }
});
