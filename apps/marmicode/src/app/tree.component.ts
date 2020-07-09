import { ISpriteProperties } from '@amcharts/amcharts4/core';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import createPanZoom from 'panzoom';
import { BehaviorSubject, merge } from 'rxjs';
import { finalize, shareReplay, switchMap } from 'rxjs/operators';
import { Amcore } from './amcore.service';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
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

      circle {
        transform: scaleY(0.5);
      }
    `,
  ],
})
export class TreeComponent implements OnInit {
  @ViewChild('container', { static: true }) containerEl: ElementRef;

  constructor(private _amcore: Amcore) {}

  ngOnInit() {
    const radius = 60;
    const rowHeight = radius * 2.5;
    const chart$ = this._amcore
      .createFromConfig({
        element: this.containerEl.nativeElement,
        configFn({ percent }) {
          return {
            series: [
              {
                type: 'ForceDirectedSeries',
                data: [
                  {
                    id: 'a',
                    name: 'Angular',
                    value: 1,
                    fixed: true,
                    x: percent(100 / 2),
                    y: radius,
                    linkWith: ['b', 'c'],
                  },
                  {
                    id: 'b',
                    name: 'Routing',
                    value: 1,
                    linkWith: ['d'],
                    fixed: true,
                    x: percent(100 / 3),
                    y: radius + rowHeight,
                  },
                  {
                    id: 'c',
                    name: 'Testing',
                    value: 1,
                    linkWith: ['d'],
                    fixed: true,
                    x: percent((2 * 100) / 3),
                    y: radius + rowHeight,
                  },
                  {
                    id: 'd',
                    name: 'Router Testing',
                    value: 1,
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
          };
        },
      })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));

    const panZoom$ = chart$.pipe(
      switchMap(() => {
        const panZoom = createPanZoom(
          this.containerEl.nativeElement.querySelector('svg')
        );
        return new BehaviorSubject(panZoom).pipe(
          finalize(() => panZoom.dispose())
        );
      })
    );

    const effects$ = merge(chart$, panZoom$);

    effects$.pipe(untilDestroyed(this)).subscribe();
  }
}

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent],
  imports: [CommonModule],
})
export class TreeModule {}
