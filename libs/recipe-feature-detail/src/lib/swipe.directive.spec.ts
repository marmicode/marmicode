import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwipeDirective, SwipeDirectiveModule } from './swipe.directive';

@Component({
  template: `
    <div *mcSwipe #divEl (swipeRight)="swipeRight$.emit($event)"></div>
  `,
})
export class SwipeTestComponent {
  /* A property to propagate the event to our test. */
  swipeRight$ = new EventEmitter();

  @ViewChild('divEl', { read: ElementRef }) divEl: ElementRef<HTMLDivElement>;
}

describe('SwipeDirective', () => {
  let component: SwipeTestComponent;
  let fixture: ComponentFixture<SwipeTestComponent>;

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
  });

  xit('🚧 should trigger swipeRight event on swipe', () => {});
});
