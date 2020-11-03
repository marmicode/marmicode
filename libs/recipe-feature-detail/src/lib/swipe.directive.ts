import { CommonModule } from '@angular/common';
import {
  Directive,
  ElementRef,
  NgModule,
  OnInit,
  Output,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';
import { shareReplayWithRefCount } from '@marmicode/shared-utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concat, fromEvent, Observable, of } from 'rxjs';
import {
  filter,
  map,
  mapTo,
  switchMap,
  takeUntil,
  tap,
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

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    /*
     * Using native events instead of HostListeners in order to avoid
     * triggering change detection for nothing.
     */
    const touchstart$ = fromEvent<TouchEvent>(
      this._elementRef.nativeElement,
      'touchstart'
    );
    const touchmove$ = fromEvent<TouchEvent>(window, 'touchmove');
    const touchend$ = fromEvent<TouchEvent>(window, 'touchend');

    this._position$ = touchstart$.pipe(
      switchMap((touchstart) =>
        concat(
          touchmove$.pipe(
            map(
              (touchmove) =>
                touchmove.touches[0].clientX - touchstart.touches[0].clientX
            ),
            takeUntil(touchend$)
          ),
          of(0)
        )
      ),
      shareReplayWithRefCount()
    );

    const swipeDistance$ = touchend$.pipe(
      withLatestFrom(this._position$),
      map(([_, position]) => position),
      filter((position) => Math.abs(position) > 150)
    );

    this.swipeLeft = swipeDistance$.pipe(
      filter((distance) => distance < 0),
      mapTo(undefined)
    );

    this.swipeRight = swipeDistance$.pipe(
      filter((distance) => distance > 0),
      mapTo(undefined)
    );
  }

  ngOnInit() {
    this._position$.pipe(untilDestroyed(this)).subscribe((position) => {
      const el = this._elementRef.nativeElement;
      if (position !== 0) {
        /* Set parent's overflow to hidden in order to hide the swipe. */
        this._applyStyle(el.parentElement, {
          overflow: 'hidden',
        });
        /* Fix the width. */
        this._renderer.setStyle(el, 'width', `${el.clientWidth}px`);
        /* Change element's position. */
        this._renderer.setStyle(el, 'margin-left', `${position}px`);

        this._renderer.setStyle(
          el,
          'filter',
          this._computeCssFilter({ position: position, width: el.clientWidth })
        );
      } else {
        /* Reset everything. */
        this._renderer.removeStyle(el.parentElement, 'overflow');
        this._renderer.removeStyle(el, 'filter');
        this._renderer.removeStyle(el, 'width');
        this._renderer.removeStyle(
          el,
          'margin-left',
          RendererStyleFlags2.DashCase
        );
      }
    });
  }

  private _applyStyle(el: HTMLElement, styles: { [key: string]: string }) {
    for (const [style, value] of Object.entries(styles)) {
      if (value !== undefined) {
        this._renderer.setStyle(el, style, value);
      } else {
        this._renderer.removeStyle(el, style);
      }
    }
  }

  private _computeCssFilter({
    position,
    width,
  }: {
    position: number;
    width: number;
  }) {
    const absPosition = Math.abs(position);
    return `blur(${absPosition / width}px) grayscale(${
      (100 * absPosition) / width
    }%)`;
  }
}

@NgModule({
  declarations: [SwipeDirective],
  exports: [SwipeDirective],
  imports: [CommonModule],
})
export class SwipeModule {}
