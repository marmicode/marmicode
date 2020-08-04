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
  template: `🚧 recipe-timeline ({{ frames.length }})`,
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
