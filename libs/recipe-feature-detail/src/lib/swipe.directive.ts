import { CommonModule } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  NgModule,
  OnInit,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[mcSwipe]',
})
export class SwipeDirective implements OnInit {
  private _touchstart$ = new Subject();
  private _touchmove$ = new Subject();
  private _touchend$ = new Subject();

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {}

  @HostListener('touchstart', ['$event']) onTouchstart(evt: TouchEvent) {
    this._touchstart$.next(evt);
  }

  @HostListener('window:touchmove', ['$event']) onTouchmove(evt: TouchEvent) {
    this._touchmove$.next(evt);
  }

  @HostListener('window:touchend', ['$event']) onTouchend(evt: TouchEvent) {
    this._touchend$.next(evt);
  }
}

@NgModule({
  declarations: [SwipeDirective],
  exports: [SwipeDirective],
  imports: [CommonModule],
})
export class SwipeDirectiveModule {}
