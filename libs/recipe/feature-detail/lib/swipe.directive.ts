import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  inject,
  NgModule,
  OnInit,
  Output,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';
import { shareReplayWithRefCount } from '@marmicode/shared/utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concat, fromEvent, Observable, of } from 'rxjs';
import {
  filter,
  map,
  mapTo,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

/**
 * @warning parent element should be `overflow: hidden`.
 */
@UntilDestroy()
@Directive({
  selector: '[mcSwipe]',
  standalone: true,
})
export class SwipeDirective implements OnInit {
  @Output() swipeLeft: Observable<void>;
  @Output() swipeRight: Observable<void>;

  private _position$: Observable<number>;
  private _window = inject(DOCUMENT).defaultView;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
  ) {
    /*
     * Using native events instead of HostListeners in order to avoid
     * triggering change detection for nothing.
     */
    const touchstart$ = fromEvent<TouchEvent>(
      this._elementRef.nativeElement,
      'touchstart',
    );
    const touchmove$ = fromEvent<TouchEvent>(this._window, 'touchmove');
    const touchend$ = fromEvent<TouchEvent>(this._window, 'touchend');

    this._position$ = touchstart$.pipe(
      switchMap((touchstart) =>
        concat(
          touchmove$.pipe(
            map(
              (touchmove) =>
                touchmove.touches[0].clientX - touchstart.touches[0].clientX,
            ),
            takeUntil(touchend$),
          ),
          of(0),
        ),
      ),
      shareReplayWithRefCount(),
    );

    const swipeDistance$ = touchend$.pipe(
      withLatestFrom(this._position$),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([_, position]) => position),
      filter((position) => Math.abs(position) > 150),
    );

    this.swipeLeft = swipeDistance$.pipe(
      filter((distance) => distance < 0),
      mapTo(undefined),
    );

    this.swipeRight = swipeDistance$.pipe(
      filter((distance) => distance > 0),
      mapTo(undefined),
    );
  }

  ngOnInit() {
    this._position$.pipe(untilDestroyed(this)).subscribe((position) => {
      const el = this._elementRef.nativeElement;
      if (position !== 0) {
        /* Set parent's overflow to hidden in order to hide the swipe. */
        this._applyStyle(el, {
          /* Apply filter. */
          filter: this._computeCssFilter({
            position: position,
            width: el.clientWidth,
          }),
          /* Change element's position. */
          ['margin-left']: `${position}px`,
          /* Freeze the width. */
          width: `${el.clientWidth}px`,
        });
      } else {
        /* Reset everything. */
        this._applyStyle(el, {
          filter: undefined,
          ['margin-left']: undefined,
          width: undefined,
        });
      }
    });
  }

  private _applyStyle(el: HTMLElement, styles: { [key: string]: string }) {
    for (const [style, value] of Object.entries(styles)) {
      if (value !== undefined) {
        this._renderer.setStyle(el, style, value, RendererStyleFlags2.DashCase);
      } else {
        this._renderer.removeStyle(el, style, RendererStyleFlags2.DashCase);
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
    return `blur(${(5 * absPosition) / width}px) grayscale(${
      (100 * absPosition) / width
    }%)`;
  }
}

@NgModule({
  exports: [SwipeDirective],
  imports: [CommonModule, SwipeDirective],
})
export class SwipeModule {}
