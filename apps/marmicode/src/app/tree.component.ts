import { ISpriteProperties, percent } from '@amcharts/amcharts4/core';
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
  template: `<div class="chart-container" #container></div>`,
  styles: [
    `
      :host {
        display: block;
      }

      .chart-container {
        height: 100vh;
      }
    `,
  ],
})
export class TreeComponent implements OnDestroy, OnInit {
  @ViewChild('container', { static: true }) containerEl: ElementRef;

  private _subscription: Subscription;

  constructor(private _amcore: Amcore) {}

  ngOnInit() {
    const radius = 60;
    const rowHeight = radius * 2.5;
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
                  x: percent(100 / 2),
                  y: radius,
                },
                {
                  id: 'b',
                  name: 'B',
                  value: 1,
                  linkWith: ['a'],
                  fixed: true,
                  x: percent(100 / 3),
                  y: radius + rowHeight,
                },
                {
                  id: 'c',
                  name: 'C',
                  value: 1,
                  linkWith: ['a'],
                  fixed: true,
                  x: percent((2 * 100) / 3),
                  y: radius + rowHeight,
                },
                {
                  id: 'd',
                  name: 'D',
                  value: 1,
                  linkWith: ['b', 'c'],
                  fixed: true,
                  x: percent(100 / 2),
                  y: radius + rowHeight * 2,
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
                fontSize: '1em',
                label: {
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
              minRadius: radius,
              maxRadius: radius,
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
