import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-learning-map',
  template: `🚧 learning-map`
})
export class LearningMapComponent {}

@NgModule({
  declarations: [LearningMapComponent],
  exports: [LearningMapComponent],
  imports: [CommonModule]
})
export class LearningMapModule {}
