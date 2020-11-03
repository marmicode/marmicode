import { CommonModule } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  NgModule,
  OnInit,
  Output,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concat, Observable, of, Subject } from 'rxjs';
import {
  filter,
  map,
  mapTo,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

/**
 * @warning this directive will set `overflow: hidden` on the parent element.
 */
@UntilDestroy()
@Directive({
  selector: '[mcSwipe]',
})
export class SwipeDirective implements OnInit {
  @Output() swipeLeft: Observable<void>;
  @Output() swipeRight: Observable<void>;

  private _position$: Observable<number>;
  private _touchstart$ = new Subject<TouchEvent>();
  private _touchmove$ = new Subject<TouchEvent>();
  private _touchend$ = new Subject<TouchEvent>();

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._position$ = this._touchstart$.pipe(
      switchMap((touchstart) =>
        concat(
          this._touchmove$.pipe(
            map(
              (touchmove) =>
                touchmove.touches[0].clientX - touchstart.touches[0].clientX
            ),
            takeUntil(this._touchend$)
          ),
          of(0)
        )
      )
    );

    this.swipeLeft = this._touchend$.pipe(
      withLatestFrom(this._position$),
      filter(([_, position]) => position < 0),
      mapTo(undefined)
    );

    this.swipeRight = this._touchend$.pipe(
      withLatestFrom(this._position$),
      filter(([_, position]) => position > 0),
      mapTo(undefined)
    );
  }

  ngOnInit() {
    this._position$.pipe(untilDestroyed(this)).subscribe((position) => {
      const el = this._elementRef.nativeElement;
      if (position !== 0) {
        /* Set parent's overflow to hidden in order to hide the swipe. */
        this._renderer.setStyle(el.parentElement, 'overflow', 'hidden');
        /* Fix the width. */
        this._renderer.setStyle(el, 'width', `${el.clientWidth}px`);
        /* Change element's position. */
        this._renderer.setStyle(el, 'margin-left', `${position}px`);
      } else {
        /* Reset everything. */
        this._renderer.removeStyle(el.parentElement, 'overflow');
        this._renderer.removeStyle(el, 'width');
        this._renderer.removeStyle(
          el,
          'margin-left',
          RendererStyleFlags2.DashCase
        );
      }
    });
  }

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
export class SwipeModule {}
