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
  template: `<hr class="main-line" />
    <ul class="chip-list">
      <li *ngFor="let frame of frames; let index = index">
        <a
          [style.left.%]="(index * 100) / (frames.length - 1)"
          class="chip"
          href="#"
        ></a>
      </li>
    </ul>`,
  styles: [
    `
      :host {
        position: relative;
        display: block;
        margin: 0 10px;
        --chip-diameter: 5px;
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
}

@NgModule({
  declarations: [RecipeTimelineComponent],
  exports: [RecipeTimelineComponent],
  imports: [CommonModule],
})
export class RecipeTimelineModule {}
