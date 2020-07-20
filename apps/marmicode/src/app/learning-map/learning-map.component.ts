import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { topics } from '../topics/topics';
import { TreeConfig } from '../tree/tree-config';
import { TreeModule } from '../tree/tree.component';
import { getTopicsTreeConfig } from './topics-tree-utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-learning-map',
  template: ` <mc-tree
    [radius]="radius"
    [treeConfig]="treeConfig$ | async"
  ></mc-tree>`,
})
export class LearningMapComponent {
  topics$ = of(topics);
  radius = 70;
  treeConfig$: Observable<TreeConfig>;

  constructor() {
    this.treeConfig$ = this.topics$.pipe(
      map((_topics) =>
        getTopicsTreeConfig({ topics: _topics, radius: this.radius })
      )
    );
  }
}

@NgModule({
  declarations: [LearningMapComponent],
  exports: [LearningMapComponent],
  imports: [CommonModule, TreeModule, TreeModule],
})
export class LearningMapModule {}
