import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { TreeModule } from './tree.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-learning-map',
  template: `<mc-tree class="tree"></mc-tree>`,
  styles: [
    `
      .tree {
        height: 100vh;
      }
    `,
  ],
})
export class LearningMapComponent {}

@NgModule({
  declarations: [LearningMapComponent],
  exports: [LearningMapComponent],
  imports: [CommonModule, TreeModule],
})
export class LearningMapModule {}
