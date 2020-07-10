import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { createTopic } from './topic';
import { getTopicsTreeConfig } from './topics-tree-utils';
import { TreeConfig } from './tree/tree-config';
import { TreeModule } from './tree/tree.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-learning-map',
  template: ` <mc-tree
    [radius]="radius"
    [treeConfig]="treeConfig$ | async"
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
    createTopic({
      id: 'immutability',
      name: 'Immutability',
      depth: 3,
      nextTopics: ['state-management', 'change-detection'],
    }),
    createTopic({
      id: 'pipes',
      name: 'Pipes',
      depth: 3,
    }),
    createTopic({
      id: 'components-interaction',
      name: 'Components Interaction',
      depth: 3,
      nextTopics: ['change-detection', 'architecture'],
    }),
    createTopic({
      id: 'directives',
      name: 'Directives',
      depth: 3,
    }),
    createTopic({
      id: 'dependency-injection',
      name: 'Dependency Injection',
      depth: 3,
    }),
    createTopic({
      id: 'modules',
      name: 'Modules',
      depth: 3,
      nextTopics: ['testing'],
    }),
    createTopic({
      id: 'i18n',
      name: 'I18n',
      depth: 3,
    }),
    createTopic({
      id: 'http-client',
      name: 'Http Client',
      depth: 4,
    }),
    createTopic({
      id: 'reactive-forms',
      name: 'Reactive Forms',
      depth: 4,
    }),
    createTopic({
      id: 'state-management',
      name: 'State Management',
      depth: 4,
    }),
    createTopic({
      id: 'change-detection',
      name: 'Change Detection',
      depth: 4,
      nextTopics: ['performance'],
    }),
    createTopic({
      id: 'architecture',
      name: 'Architecture',
      depth: 4,
      nextTopics: ['monorepo'],
    }),
    createTopic({
      id: 'testing',
      name: 'Testing',
      depth: 4,
      nextTopics: ['router-testing'],
    }),
    createTopic({
      id: 'routing',
      name: 'Routing',
      depth: 4,
      nextTopics: ['router-testing'],
    }),
    createTopic({
      id: 'performance',
      name: 'Performance',
      depth: 5,
    }),
    createTopic({
      id: 'monorepo',
      name: 'Monorepo',
      depth: 5,
    }),
    createTopic({
      id: 'router-testing',
      name: 'Router Testing',
      depth: 5,
    }),
  ]);
  radius = 60;
  treeConfig$: Observable<TreeConfig>;

  constructor() {
    this.treeConfig$ = this.topics$.pipe(
      map((topics) =>
        getTopicsTreeConfig({ topics: topics, radius: this.radius })
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
