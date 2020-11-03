import { AnimationBuilder } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Directive, Input, NgModule } from '@angular/core';
import { RxState } from '@rx-angular/state';

// export function createSlideInAnimation(direction: 'left' | 'right') {
//   return animate(
//     '200ms',
//     keyframes([
//       style({
//         transform: `translateX(${direction === 'right' ? '-' : 0}100%)`,
//       }),
//       style({ transform: 'translateX(0)' }),
//     ])
//   );
// }
// export enum Direction {
//   Left = 'left',
//   Right = 'right',
// }

/**
 * Animate depending on index change.
 */
@Directive({
  selector: '[mcSlideAnimation]',
})
export class SlideAnimationDirective {
  @Input() set slideIndex(slideIndex: number) {
    this._state.set({ slideIndex });
  }

  constructor(
    private _animationBuilder: AnimationBuilder,
    private _state: RxState<{ slideIndex: number }>
  ) {}
}

@NgModule({
  declarations: [SlideAnimationDirective],
  exports: [SlideAnimationDirective],
  imports: [CommonModule],
})
export class SlideAnimationModule {}
