import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
  template: ` <!-- I hate the imperative approach but that's the easiest way here without indirections. -->
    <!-- We need this because we can't style our recenter button properly in the
  tree component due to shadow dom encapsulation. -->
    <button
      (click)="tree.recenter()"
      class="tree-recenter-button"
      color="primary"
      mat-fab
      type="button"
    >
      <mat-icon>center_focus_strong</mat-icon>
    </button>
    <mc-tree
      #tree
      [radius]="radius"
      [treeConfig]="treeConfig$ | async"
    ></mc-tree>`,
  styles: [
    `
      .tree-recenter-button {
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 1;
      }
    `,
  ],
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
  imports: [CommonModule, MatButtonModule, MatIconModule, TreeModule],
})
export class LearningMapModule {}
