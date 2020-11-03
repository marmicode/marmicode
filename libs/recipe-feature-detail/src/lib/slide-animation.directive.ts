import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  keyframes,
  style,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Input, NgModule, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { concat, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, pairwise, switchMap } from 'rxjs/operators';

export enum Direction {
  Left = 'left',
  Right = 'right',
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

  private _animationSpeed = '200ms';

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
        this._animationSpeed,
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
        this._animationSpeed,
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
