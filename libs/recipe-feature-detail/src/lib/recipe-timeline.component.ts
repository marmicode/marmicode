import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { RecipeFrame } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-timeline',
  template: ` <div class="line-container">
    <hr class="main-line" />
    <ul class="bullet-list">
      <li *ngFor="let frame of frames; let index = index">
        <a
          [style.left.%]="getFrameChipPosition(index)"
          [class.previous-bullet]="index < selectedFrameIndex"
          [class.current-bullet]="index === selectedFrameIndex"
          class="bullet"
          href="#"
        ></a>
      </li>
    </ul>
  </div>`,
  styles: [
    `
      :host {
        display: block;
        margin: 0 15px 0 10px;
      }

      .line-container {
        display: block;
        position: relative;
      }

      .main-line {
        border: 1px solid #666;
      }

      .bullet-list {
        list-style-type: none;
      }
    `,
  ],
  /* I hate scss but we are using it here for computing bullet dimensions
   * and positioning. */
  styleUrls: ['./recipe-timeline.component.scss'],
})
export class RecipeTimelineComponent {
  @Input() frames: RecipeFrame[];
  @Input() selectedFrameIndex: number;

  getFrameChipPosition(index: number) {
    return (index * 100) / (this.frames.length - 1);
  }
}

@NgModule({
  declarations: [RecipeTimelineComponent],
  exports: [RecipeTimelineComponent],
  imports: [CommonModule],
})
export class RecipeTimelineModule {}
