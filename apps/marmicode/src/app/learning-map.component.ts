import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { getTopicsTreeNodes, TreeNode } from './chart-utils';
import { createTopic } from './topic';
import { TreeModule } from './tree.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-learning-map',
  template: ` <mc-tree
    [treeNodes]="treeNodes$ | async"
    class="tree"
  ></mc-tree>`,
  styles: [
    `
      .tree {
        height: 100vh;
      }
    `,
  ],
})
export class LearningMapComponent {
  topics$ = of([
    createTopic({
      id: 'web-basics',
      name: 'Web Basics',
      depth: 0,
      nextTopics: ['typescript', 'cli'],
    }),
    createTopic({
      id: 'typescript',
      name: 'Typescript',
      depth: 1,
      nextTopics: ['rxjs', 'components'],
    }),
    createTopic({
      id: 'cli',
      name: 'CLI',
      depth: 1,
      nextTopics: ['components'],
    }),
    createTopic({
      id: 'components',
      name: 'Components',
      depth: 2,
      nextTopics: ['pipes'],
    }),
    createTopic({
      id: 'rxjs',
      name: 'RxJS',
      depth: 3,
    }),
  ]);
  treeNodes$: Observable<TreeNode[]>;

  constructor() {
    this.treeNodes$ = this.topics$.pipe(
      map((topics) => getTopicsTreeNodes(topics))
    );
  }
}

@NgModule({
  declarations: [LearningMapComponent],
  exports: [LearningMapComponent],
  imports: [CommonModule, TreeModule],
})
export class LearningMapModule {}
