import { ISpriteProperties } from '@amcharts/amcharts4/core';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgModule,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import createPanZoom from 'panzoom';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { finalize, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Amcore } from './amcore.service';
import { TreeConfig } from './tree-config';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'mc-tree',
  template: ` <div>
      <button type="button" (click)="zoomReset$.next()">RESET</button>
    </div>
    <div
      [style.height]="height$ | async"
      [style.width]="width$ | async"
      class="chart-container"
      #container
    ></div>`,
  styles: [
    `
      :host {
        display: block;
      }

      .chart-container {
        height: 100vh;
        overflow: hidden;
      }

      circle {
        transform: scaleY(0.5);
      }
    `,
  ],
})
export class TreeComponent implements OnInit {
  @ViewChild('container', { static: true }) containerEl: ElementRef;

  @Input() radius: number;
  @Input() set treeConfig(treeConfig: TreeConfig) {
    this._treeConfig$.next(treeConfig);
  }

  height$: Observable<number>;
  width$: Observable<number>;
  zoomReset$ = new Subject<void>();

  private _treeConfig$ = new ReplaySubject<TreeConfig>(1);

  constructor(private _amcore: Amcore) {
    this.height$ = this._treeConfig$.pipe(map((config) => config.height));
    this.width$ = this._treeConfig$.pipe(map((config) => config.width));
  }

  ngOnInit() {
    const chart$ = this._treeConfig$.pipe(
      switchMap((treeConfig) =>
        this._amcore.createFromConfig({
          element: this.containerEl.nativeElement,
          configFn: () => {
            return {
              series: [
                {
                  type: 'ForceDirectedSeries',
                  data: treeConfig.nodes.map((node) => ({
                    ...node,
                    fixed: true,
                    value: 1,
                  })),
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
                  minRadius: this.radius,
                  maxRadius: this.radius,
                  height: 2000,
                },
              ],
            };
          },
        })
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    const panZoom$ = chart$.pipe(
      switchMap(() => {
        const panZoom = createPanZoom(
          this.containerEl.nativeElement.querySelector('svg>g'),
          {
            bounds: true,
            boundsPadding: 0.2,
            minZoom: 0.5,
            maxZoom: 2,
            smoothScroll: false,
          }
        );
        return new BehaviorSubject(panZoom).pipe(
          finalize(() => panZoom.dispose())
        );
      })
    );

    const effects$ = merge(
      chart$,
      panZoom$,
      combineLatest([panZoom$, this.zoomReset$]).pipe(
        tap(([panZoom]) => {
          panZoom.zoomAbs(0, 0, 1);
          panZoom.moveTo(0, 0);
        })
      )
    );

    effects$.pipe(untilDestroyed(this)).subscribe();
  }
}

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent],
  imports: [CommonModule],
})
export class TreeModule {}
