import { Component, DebugElement, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { SwipeModule } from './swipe.directive';

@Component({
  template: `
    <div data-role="container">
      <div
        data-role="content"
        mcSwipe
        (swipeLeft)="swipeLeft$.emit($event)"
        (swipeRight)="swipeRight$.emit($event)"
      >
        <div>CONTENT</div>
      </div>
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
    contentEl = fixture.debugElement.query(By.css('[data-role=content]'));
  });

  it('should move content to right with margin', () => {
    triggerTouchEvent({ eventName: 'touchstart', clientX: 200 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 250 });

    expect(contentEl.styles).toEqual(
      expect.objectContaining({
        marginLeft: '50px',
      })
    );
  });

  it('should reset position on touchend', () => {
    triggerTouchEvent({ eventName: 'touchstart', clientX: 200 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 400 });
    triggerTouchEvent({ eventName: 'touchend' });

    expect(contentEl.styles.marginLeft).toEqual('');
  });

  it('should apply CSS filter', () => {
    triggerTouchEvent({ eventName: 'touchstart', clientX: 200 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 250 });

    expect(contentEl.styles).toEqual(
      expect.objectContaining({
        filter: expect.stringMatching(/blur\(.*px\) grayscale\(.*%\)/),
      })
    );
  });

  it('should reset CSS filter on touchend', () => {
    triggerTouchEvent({ eventName: 'touchstart', clientX: 200 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 400 });
    triggerTouchEvent({ eventName: 'touchend' });

    expect(contentEl.styles.filter).toEqual('');
  });

  it('should trigger swipeLeft event on swipe', () => {
    const observer = jest.fn();
    component.swipeLeft$.subscribe(observer);

    triggerTouchEvent({ eventName: 'touchstart', clientX: 200 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 20 });
    triggerTouchEvent({ eventName: 'touchend' });

    expect(observer).toBeCalledTimes(1);
  });

  it('should trigger swipeRight event on swipe', () => {
    const observer = jest.fn();
    component.swipeRight$.subscribe(observer);

    triggerTouchEvent({ eventName: 'touchstart', clientX: 200 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 400 });
    triggerTouchEvent({ eventName: 'touchend' });

    expect(observer).toBeCalledTimes(1);
  });

  it('should not trigger swipe event if less than 150px', () => {
    const observer = jest.fn();
    component.swipeRight$.subscribe(observer);

    triggerTouchEvent({ eventName: 'touchstart', clientX: 200 });
    triggerTouchEvent({ eventName: 'touchmove', clientX: 320 });
    triggerTouchEvent({ eventName: 'touchend' });

    expect(observer).not.toBeCalled();
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
      contentEl.nativeElement.dispatchEvent(
        new TouchEvent(eventName, {
          touches,
        } as TouchEventInit)
      );
    }
  }
});
