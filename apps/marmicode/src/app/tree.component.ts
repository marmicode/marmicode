import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { Amcore } from './amcore.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-tree',
  template: `🚧 tree`,
})
export class TreeComponent implements OnInit {
  constructor(private _amcore: Amcore) {}

  ngOnInit() {
  }
}

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent],
  imports: [CommonModule],
})
export class TreeModule {}
