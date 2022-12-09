import { animate, keyframes, style } from '@angular/animations';
import { ElementRef } from '@angular/core';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { RxState } from '@rx-angular/state';
import { SlideAnimationDirective } from './slide-animation.directive';

describe('SlideAnimationDirective', () => {
  let animationBuilder: {
    build: jest.Mock;
  };
  let directive: SlideAnimationDirective;
  let mockPlayLeftToRight: jest.Mock;
  let mockPlayRightToLeft: jest.Mock;
  let mockPlayInitialAnimation: jest.Mock;

  beforeEach(() => {
    mockPlayLeftToRight = jest.fn();
    mockPlayRightToLeft = jest.fn();
    mockPlayInitialAnimation = jest.fn();
    animationBuilder = {
      build: jest
        .fn()
        .mockReturnValueOnce({
          create: jest.fn().mockReturnValue({
            play: mockPlayLeftToRight,
            destroy: jest.fn(),
          }),
        })
        .mockReturnValueOnce({
          create: jest.fn().mockReturnValue({
            play: mockPlayRightToLeft,
            destroy: jest.fn(),
          }),
        })
        .mockReturnValueOnce({
          create: jest.fn().mockReturnValue({
            play: mockPlayInitialAnimation,
            destroy: jest.fn(),
          }),
        }),
    };
    directive = new SlideAnimationDirective(
      animationBuilder,
      {} as ElementRef,
      new RxState<{ slideIndex: number }>()
    );
    directive.ngOnInit();
  });

  it('should build animations', () => {
    expect(animationBuilder.build).toBeCalledTimes(3);
    /* Left to right animation. */
    expect(animationBuilder.build).toHaveBeenNthCalledWith(
      1,
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
      2,
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
    /* Initial animation. */
    expect(animationBuilder.build).toHaveBeenNthCalledWith(
      3,
      animate(
        /* We don't care about animation duration. */
        expect.any(String),
        keyframes([
          style({
            opacity: 0,
          }),
          style({ opacity: 1 }),
        ])
      )
    );
  });

  it('should run initial animation when index is initialized', () => {
    directive.slideIndex = 3;

    expect(mockPlayInitialAnimation).toBeCalledTimes(1);
  });

  it('should slide in right to left when index increases', () => {
    directive.slideIndex = 3;
    directive.slideIndex = 4;

    expect(mockPlayRightToLeft).toBeCalledTimes(1);
  });

  it('should slide in left to right when index decreases', () => {
    directive.slideIndex = 3;
    directive.slideIndex = 2;

    expect(mockPlayLeftToRight).toBeCalledTimes(1);
  });
});
