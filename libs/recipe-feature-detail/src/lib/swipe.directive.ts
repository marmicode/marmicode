import { CommonModule } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  NgModule,
  OnInit,
  Renderer2,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concat, Observable, of, Subject } from 'rxjs';
import {
  first,
  map,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

@UntilDestroy()
@Directive({
  selector: '[mcSwipe]',
})
export class SwipeDirective implements OnInit {
  private _position$: Observable<number>;
  private _touchstart$ = new Subject<TouchEvent>();
  private _touchmove$ = new Subject<TouchEvent>();
  private _touchend$ = new Subject<TouchEvent>();

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._position$ = this._touchstart$.pipe(
      switchMap(() => {
        const position$ = this._touchmove$.pipe(
          map((evt) => evt.touches[0].clientX)
        );
        const origin$ = position$.pipe(first());
        return concat(
          position$.pipe(
            withLatestFrom(origin$),
            map(([position, origin]) => position - origin),
            takeUntil(this._touchend$)
          ),
          of(0)
        );
      })
    );
  }

  ngOnInit() {
    this._position$.pipe(untilDestroyed(this)).subscribe((position) => {
      const el = this._elementRef.nativeElement;
      if (position !== 0) {
        this._renderer.setStyle(el, 'overflow', 'hidden');
        this._renderer.setStyle(el, 'paddingLeft', `${position}px`);
      } else {
        this._renderer.removeStyle(el, 'overflow');
        this._renderer.removeStyle(el, 'paddingLeft');
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
export class SwipeDirectiveModule {}
