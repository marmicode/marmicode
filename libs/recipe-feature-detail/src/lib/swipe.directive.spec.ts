import { Component, DebugElement, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SwipeDirective, SwipeDirectiveModule } from './swipe.directive';

@Component({
  template: `
    <div data-role="container" *mcSwipe (swipeRight)="swipeRight$.emit($event)">
      <div data-role="content">CONTENT</div>
    </div>
  `,
})
export class SwipeTestComponent {
  /* A property to propagate the event to our test. */
  swipeRight$ = new EventEmitter();
}

describe('SwipeDirective', () => {
  let component: SwipeTestComponent;
  let fixture: ComponentFixture<SwipeTestComponent>;
  let containerEl: DebugElement;
  let contentEl: DebugElement;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [SwipeTestComponent],
      imports: [SwipeDirectiveModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    containerEl = fixture.debugElement.query(By.css('[data-role=container]'));
    contentEl = fixture.debugElement.query(By.css('[data-role=content]'));
  });

  xit('🚧 should apply overflow hidden when swipe starts', () => {
    expect(containerEl.styles).not.toEqual(
      expect.objectContaining({
        overflow: 'hidden',
      })
    );

    triggerTouchEvent({ eventName: 'touchstart', clientX: 100 });

    expect(containerEl.styles).toEqual(
      expect.objectContaining({
        overflow: 'hidden',
      })
    );
  });

  xit('🚧 should trigger swipeRight event on swipe', () => {
    const observer = jest.fn();
    component.swipeRight$.subscribe(observer);

    /* Start touch. */
    triggerTouchEvent({ eventName: 'touchstart', clientX: 100 });

    /* Move to right. */
    triggerTouchEvent({ eventName: 'mousemove', clientX: 150 });

    expect(containerEl.styles).toEqual(
      expect.objectContaining({
        paddingLeft: '50px',
      })
    );

    expect(observer).toBeCalledTimes(1);
  });

  function triggerTouchEvent({
    eventName,
    clientX,
  }: {
    eventName: 'touchstart' | 'mousemove';
    clientX: number;
  }) {
    containerEl.triggerEventHandler(eventName, {
      touches: [{ clientX }],
    });
  }
});
