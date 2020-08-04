import { CommonModule } from '@angular/common';
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
import { RecipeFrame } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-timeline',
  template: `
    <div
      [class.full-width]="isLastFrame$ | async"
      class="line-container"
      fxFlex
    >
      <hr class="line" />
      <hr [style.width.%]="progress$" class="past-line" />
      <ul class="bullet-list">
        <li *ngFor="let bullet of bullets$ | async">
          <a
            [style.left.%]="bullet.position"
            [class.previous-bullet]="bullet.isPast"
            [class.current-bullet]="bullet.isCurrent"
            [routerLink]="bullet.route"
            class="bullet"
          ></a>
        </li>
      </ul>
    </div>
    <a
      *ngIf="nextFrameRoute$ | async as nextFrameRoute"
      [routerLink]="nextFrameRoute"
      class="next-frame-link"
    >
      <button class="next-frame-button" mat-icon-button>
        <mat-icon class="next-frame-icon">chevron_right</mat-icon>
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
        margin-right: 60px;
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

      .next-frame-link {
        position: absolute;
        right: 0;
      }

      .next-frame-button {
        color: var(--marmicode-accent-color);
        border: solid 1px;
      }

      .next-frame-icon {
        margin-bottom: 4px;
      }
    `,
  ],
  /* I hate scss but we are using it here for computing bullet dimensions
   * and positioning. */
  styleUrls: ['./recipe-timeline.component.scss'],
  providers: [RxState],
})
export class RecipeTimelineComponent {
  @Input() set frames(frames: RecipeFrame[]) {
    this._state.set({ frames });
  }
  @Input() set recipeSlug(recipeSlug: string) {
    this._state.set({ recipeSlug });
  }
  @Input() set currentFrameIndex(currentFrameIndex: number) {
    this._state.set({ currentFrameIndex });
  }

  currentFrameIndex$ = this._state.select('currentFrameIndex');
  frames$ = this._state.select('frames');
  bullets$ = this._state.select(
    map(({ frames, recipeSlug, currentFrameIndex }) =>
      frames.map((frame, index) => ({
        frame,
        isPast: index < currentFrameIndex,
        isCurrent: index === currentFrameIndex,
        position: this._getBulletPosition({ frames, index }),
        route: recipeDetailRouterHelper.recipeFrame({
          recipeSlug: recipeSlug,
          frameSlug: frame.slug,
        }),
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
      return recipeDetailRouterHelper.recipeFrame({
        recipeSlug,
        frameSlug: nextFrame.slug,
      });
    })
  );

  constructor(
    private _state: RxState<{
      frames: RecipeFrame[];
      recipeSlug: string;
      currentFrameIndex: number;
    }>
  ) {}

  private _getBulletPosition({
    frames,
    index,
  }: {
    frames: RecipeFrame[];
    index: number;
  }) {
    return (index * 100) / (frames.length - 1);
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
