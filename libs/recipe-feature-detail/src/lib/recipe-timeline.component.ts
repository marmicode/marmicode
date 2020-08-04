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
  template: `<div class="line-container">
    <hr class="main-line" />
    <ul class="chip-list">
      <li *ngFor="let frame of frames; let index = index">
        <a
          [style.left.%]="getFrameChipPosition(index)"
          class="chip"
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
        --chip-diameter: 5px;
      }

      .line-container {
        display: block;
        position: relative;
      }

      .main-line {
        border: 1px solid #666;
      }

      .chip-list {
        list-style-type: none;
      }

      .chip {
        display: block;
        position: absolute;
        top: -5px;
        left: 0;

        background-color: #666;
        border-radius: 50%;
        height: 11px;
        width: 11px;
      }
    `,
  ],
})
export class RecipeTimelineComponent {
  @Input() frames: RecipeFrame[];

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
