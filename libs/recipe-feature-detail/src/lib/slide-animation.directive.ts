import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  keyframes,
  style,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Directive,
  ElementRef,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { concat, EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  pairwise,
  switchMap,
  tap,
} from 'rxjs/operators';

export enum Direction {
  Left = 'left',
  Right = 'right',
}

export function createSlideInAnimation(direction: Direction) {
  return animate(
    '200ms',
    keyframes([
      style({
        transform: `translateX(${direction === 'right' ? '-' : 0}100%)`,
      }),
      style({ transform: 'translateX(0)' }),
    ])
  );
}

/**
 * Animate depending on index change.
 */
@Directive({
  selector: '[mcSlideAnimation]',
})
export class SlideAnimationDirective implements OnInit {
  @Input() set slideIndex(slideIndex: number) {
    this._state.set({ slideIndex });
  }

  private _slideIndex$ = this._state.select('slideIndex');

  private _leftToRightAnimationFactory: AnimationFactory;
  private _rightToLeftAnimationFactory: AnimationFactory;
  private _initialAnimationFactory: AnimationFactory;

  constructor(
    private _animationBuilder: AnimationBuilder,
    private _elementRef: ElementRef,
    private _state: RxState<{ slideIndex: number }>
  ) {
    this._state.hold(
      /* Start with null. */
      concat(of(null), this._slideIndex$).pipe(
        distinctUntilChanged(),
        pairwise(),
        map(([previous, current]) => {
          /* Run initial animation when directive is loaded. */
          if (previous == null) {
            return this._initialAnimationFactory;
          }

          return current > previous
            ? this._rightToLeftAnimationFactory
            : this._leftToRightAnimationFactory;
        }),
        switchMap(
          (animationFactory) =>
            new Observable(() => {
              const player = animationFactory.create(
                this._elementRef.nativeElement
              );
              player.play();
              return () => player.destroy();
            })
        )
      )
    );
  }

  ngOnInit() {
    this._leftToRightAnimationFactory = this._createSlideAnimationFactory(
      Direction.Right
    );
    this._rightToLeftAnimationFactory = this._createSlideAnimationFactory(
      Direction.Left
    );
    this._initialAnimationFactory = this._animationBuilder.build(
      animate(
        '200ms',
        keyframes([
          style({
            opacity: 0,
          }),
          style({
            opacity: 1,
          }),
        ])
      )
    );
  }

  private _createSlideAnimationFactory(direction: Direction) {
    return this._animationBuilder.build(
      animate(
        '200ms',
        keyframes([
          style({
            transform: `translateX(${
              direction === Direction.Right ? '-' : ''
            }100%)`,
          }),
          style({ transform: 'translateX(0)' }),
        ])
      )
    );
  }
}

@NgModule({
  declarations: [SlideAnimationDirective],
  exports: [SlideAnimationDirective],
  imports: [CommonModule],
})
export class SlideAnimationModule {}
