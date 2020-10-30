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
import { Frame } from '@marmicode/recipe-core';
import { RxState, select, selectSlice } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { getRelativeFrameRoute } from './get-relative-frame-route';

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
            class="bullet"
          ></a>
        </li>
      </ul>
    </div>
    <a [routerLink]="nextFrameRoute">
      <button
        [disabled]="nextFrameRoute == null"
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

  @Input() nextFrameRoute: string;

  bullets$ = this._state.select().pipe(
    selectSlice(['frames', 'currentFrameIndex']),
    select(
      map(({ frames, currentFrameIndex }) =>
        frames.map((frame, index) => ({
          frame,
          isPast: index < currentFrameIndex,
          isCurrent: index === currentFrameIndex,
          position: this._getBulletPosition({ frames, index }),
          route: getRelativeFrameRoute(frame.slug),
        }))
      )
    )
  );

  progress$ = this._state
    .select()
    .pipe(
      selectSlice(['frames', 'currentFrameIndex']),
      select(
        map(({ frames, currentFrameIndex }) =>
          this._getBulletPosition({ frames, index: currentFrameIndex })
        )
      )
    );

  constructor(
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
