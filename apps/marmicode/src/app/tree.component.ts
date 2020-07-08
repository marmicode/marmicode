import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { defer } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-tree',
  template: `🚧 tree`,
})
export class TreeComponent implements OnInit {
  ngOnInit() {
    const amcore = defer(() => import('@amcharts/amcharts4/core'));
    const amcharts = defer(() => import('@amcharts/amcharts4/charts'));
  }
}

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent],
  imports: [CommonModule],
})
export class TreeModule {}
