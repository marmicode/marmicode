import { animate, keyframes, style } from '@angular/animations';
import { RxState } from '@rx-angular/state';
import { SlideAnimationDirective } from './slide-animation.directive';

describe('SlideAnimationDirective', () => {
  let animationBuilder: {
    build: jest.Mock;
  };
  let directive: SlideAnimationDirective;
  let mockPlayLeftToRight: jest.Mock;
  let mockPlayRightToLeft: jest.Mock;

  beforeEach(() => {
    mockPlayLeftToRight = jest.fn();
    mockPlayRightToLeft = jest.fn();
    animationBuilder = {
      build: jest
        .fn()
        .mockReturnValueOnce({
          create: jest.fn().mockReturnValue({
            play: mockPlayLeftToRight,
          }),
        })
        .mockReturnValueOnce({
          create: jest.fn().mockReturnValue({
            play: mockPlayRightToLeft,
          }),
        }),
    };
    directive = new SlideAnimationDirective(
      animationBuilder,
      new RxState<{ slideIndex: number }>()
    );
  });

  xit('🚧 should build left and right animations', () => {
    expect(animationBuilder.build).toBeCalledTimes(2);
    /* Left to right animation. */
    expect(animationBuilder.build).toHaveBeenNthCalledWith(
      0,
      animate(
        /* We don't care about animation duration. */
        expect.any(String),
        keyframes([
          style({
            transform: `translateX(-100%)`,
          }),
          style({ transform: 'translateX(0)' }),
        ])
      )
    );
    /* Right to left animation. */
    expect(animationBuilder.build).toHaveBeenNthCalledWith(
      1,
      animate(
        /* We don't care about animation duration. */
        expect.any(String),
        keyframes([
          style({
            transform: `translateX(100%)`,
          }),
          style({ transform: 'translateX(0)' }),
        ])
      )
    );
  });

  xit('🚧 should slide in right to left when index increases', () => {
    directive.slideIndex = 2;
    directive.slideIndex = 3;

    expect(mockPlayRightToLeft).toBeCalledTimes(1);
  });

  xit('🚧 should slide in left to right when index decreases', () => {
    directive.slideIndex = 3;
    directive.slideIndex = 2;

    expect(mockPlayLeftToRight).toBeCalledTimes(1);
  });
});
