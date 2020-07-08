import { ISpriteProperties } from '@amcharts/amcharts4/core';
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
      .createFromConfig({
        element: this.containerEl.nativeElement,
        config: {
          series: [
            {
              type: 'ForceDirectedSeries',
              data: [
                {
                  id: 'a',
                  name: 'A',
                  value: 1,
                  fixed: true,
                  y: 40,
                },
                {
                  id: 'b',
                  name: 'B',
                  value: 1,
                  linkWith: ['a'],
                  fixed: true,
                  y: 120,
                },
                {
                  id: 'c',
                  name: 'C',
                  value: 1,
                  linkWith: ['a'],
                  fixed: true,
                  y: 120,
                },
                {
                  id: 'd',
                  name: 'D',
                  value: 1,
                  linkWith: ['b', 'c'],
                  fixed: true,
                  y: 200,
                },
              ],
              dataFields: {
                id: 'id',
                name: 'name',
                value: 'value',
                children: 'children',
                fixed: 'fixed',
                linkWith: 'linkWith',
              },
              links: {
                strokeWidth: 10,
              },
              nodes: {
                label: {
                  fontSize: '1em',
                  text: '{name}',
                  hideOversized: false,
                  truncate: true,
                },
                propertyFields: {
                  x: 'x',
                  y: 'y',
                },
                events: {
                  hit: (event) =>
                    console.log(event.target.dataItem.dataContext),
                },
              } as ISpriteProperties,
            },
          ],
        },
      })
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
