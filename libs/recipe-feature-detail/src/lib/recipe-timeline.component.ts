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
  template: `<hr class="main-line" />`,
  styles: [
    `
      :host {
        display: block;
        margin: 0 10px;
      }

      .main-line {
        border: 1px solid #666;
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
