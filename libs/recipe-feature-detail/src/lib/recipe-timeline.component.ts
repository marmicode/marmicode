import { CommonModule, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { recipeDetailRouterHelper } from '@marmicode/shared-router-helpers';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { Frame } from '../../../recipe-core/src/lib/frame';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-timeline',
  template: `
    <div class="line-container" fxFlex>
      <hr class="line" />
      <hr [style.width.%]="progress$ | async" class="past-line" />
      <ul class="bullet-list">
        <li *ngFor="let bullet of bullets$ | async">
          <a
            [style.left.%]="bullet.position"
            [class.previous-bullet]="bullet.isPast"
            [class.current-bullet]="bullet.isCurrent"
            [routerLink]="bullet.route"
            (click)="scrollTop()"
            class="bullet"
          ></a>
        </li>
      </ul>
    </div>
    <a [routerLink]="nextFrameRoute$ | async" (click)="scrollTop()">
      <button
        [disabled]="isLastFrame$ | async"
        class="next-frame-button"
        mat-stroked-button
      >
        <span>NEXT</span>
      </button>
    </a>
  `,
  styles: [
    `
      :host {
        position: relative;
        display: block;
        height: 44px;
        margin: 0 10px;
      }

      .line-container {
        display: block;
        position: relative;
        margin-top: 20px;
        margin-right: 20px;
        transition: all 0.3s ease-out;
      }

      .line,
      .past-line {
        margin: 0;
      }

      .line {
        border: 1px solid #666;
      }

      .past-line {
        position: absolute;
        border: 1.5px solid var(--marmicode-accent-color);
        top: -1px;
        width: 0;
        transition: width 0.3s ease-out;
      }

      .bullet-list {
        margin: 0;
        list-style-type: none;
      }

      .next-frame-button {
        color: var(--marmicode-accent-color);
      }
    `,
  ],
  /* I hate scss but we are using it here for computing bullet dimensions
   * and positioning. */
  styleUrls: ['./recipe-timeline.component.scss'],
  providers: [RxState],
})
export class RecipeTimelineComponent {
  @Input() set frames(frames: Frame[]) {
    this._state.set({ frames });
  }
  @Input() set recipeSlug(recipeSlug: string) {
    this._state.set({ recipeSlug });
  }
  @Input() set currentFrameIndex(currentFrameIndex: number) {
    this._state.set({ currentFrameIndex });
  }

  frames$ = this._state.select('frames');
  bullets$ = this._state.select(
    map(({ frames, recipeSlug, currentFrameIndex }) =>
      frames.map((frame, index) => ({
        frame,
        isPast: index < currentFrameIndex,
        isCurrent: index === currentFrameIndex,
        position: this._getBulletPosition({ frames, index }),
        route: this._getFrameRoute(frame.slug),
      }))
    )
  );
  progress$ = this._state.select(
    map(({ currentFrameIndex, frames }) =>
      this._getBulletPosition({ frames, index: currentFrameIndex })
    )
  );
  recipeSlug$ = this._state.select('recipeSlug');
  isLastFrame$ = this._state.select(
    map(
      ({ frames, currentFrameIndex }) => currentFrameIndex === frames.length - 1
    )
  );
  nextFrameRoute$ = this._state.select(
    map(({ frames, currentFrameIndex, recipeSlug }) => {
      const nextFrame = frames[currentFrameIndex + 1];
      if (nextFrame == null) {
        return null;
      }
      return this._getFrameRoute(nextFrame.slug);
    })
  );

  constructor(
    private _viewportScroller: ViewportScroller,
    private _state: RxState<{
      frames: Frame[];
      recipeSlug: string;
      currentFrameIndex: number;
    }>
  ) {}

  private _getBulletPosition({
    frames,
    index,
  }: {
    frames: Frame[];
    index: number;
  }) {
    return (index * 100) / (frames.length - 1);
  }

  scrollTop() {
    this._viewportScroller.scrollToPosition([0, 0]);
  }

  private _getFrameRoute(frameSlug: string) {
    /* Using relative path to keep the recipe type prefix in the URL. */
    return ['..', frameSlug];
  }
}

@NgModule({
  declarations: [RecipeTimelineComponent],
  exports: [RecipeTimelineComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
  ],
})
export class RecipeTimelineModule {}
