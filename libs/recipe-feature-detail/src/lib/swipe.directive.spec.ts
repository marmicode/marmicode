import {
  Component,
  DebugElement,
  ElementRef,
  EventEmitter,
  ViewChild,
} from '@angular/core';
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

  xit('🚧 should trigger swipeRight event on swipe', () => {
    /* Start touch. */
    // @todo check container doesn't have overflow hidden
    // @todo set some position in event
    containerEl.triggerEventHandler('touchstart', {});

    // @todo trigger mouse move
    // @todo check container has overflow hidden
    // @todo check content position
    // @todo check swipeRight event has been emitted
  });
});
