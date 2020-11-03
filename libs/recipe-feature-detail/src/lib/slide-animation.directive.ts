import {
  animate,
  AnimationBuilder,
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
export class SlideAnimationDirective implements OnDestroy, OnInit {
  @Input() set slideIndex(slideIndex: number) {
    this._state.set({ slideIndex });
  }

  private _leftToRightPlayer: AnimationPlayer;
  private _rightToLeftPlayer: AnimationPlayer;

  constructor(
    private _animationBuilder: AnimationBuilder,
    private _elementRef: ElementRef,
    private _state: RxState<{ slideIndex: number }>
  ) {}

  ngOnInit() {
    this._leftToRightPlayer = this._createSlideInPlayer(Direction.Right);
    this._rightToLeftPlayer = this._createSlideInPlayer(Direction.Left);
  }

  ngOnDestroy() {
    this._leftToRightPlayer.destroy();
    this._rightToLeftPlayer.destroy();
  }

  private _createSlideInPlayer(direction: Direction) {
    return this._animationBuilder
      .build(
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
      )
      .create(this._elementRef.nativeElement);
  }
}

@NgModule({
  declarations: [SlideAnimationDirective],
  exports: [SlideAnimationDirective],
  imports: [CommonModule],
})
export class SlideAnimationModule {}
