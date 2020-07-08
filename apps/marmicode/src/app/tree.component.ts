import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgModule,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Amcore } from './amcore.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-tree',
  template: `<div #container></div>`,
})
export class TreeComponent implements OnDestroy, OnInit {
  @ViewChild('container', { static: true }) containerEl: ElementRef;

  private _subscription: Subscription;

  constructor(private _amcore: Amcore) {}

  ngOnInit() {
    this._subscription = this._amcore
      .createTree(this.containerEl.nativeElement)
      .subscribe();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent],
  imports: [CommonModule],
})
export class TreeModule {}
