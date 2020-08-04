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
      <li *ngFor="let frame of frames">
        <a class="chip" href="#"></a>
      </li>
    </ul>`,
  styles: [
    `
      :host {
        display: block;
        margin: 0 10px;
      }

      .main-line {
        border: 1px solid #666;
      }

      .chip-list {
        list-style-type: none;
      }

      .chip {
        display: block;
        background-color: #666;
        border-radius: 50%;
        height: 12px;
        width: 12px;
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
