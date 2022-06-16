import { DataItem, ISpriteProperties } from '@amcharts/amcharts4/core';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
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
import {
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Amcore } from './amcore.service';
import { TreeConfig } from './tree-config';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'mc-tree',
  template: ` <div #treeContainer class="tree-container">
    <div
      #tree
      [style.height.px]="treeHeight$ | async"
      [style.width.px]="treeWidth$ | async"
      class="tree"
    ></div>
  </div>`,
  styles: [
    `
      :host {
        display: block;
      }

      .tree-container {
        overflow: hidden;
      }

      .tree {
        overflow: hidden;
        min-height: 100vh;
      }

      circle {
        cursor: pointer;
        transition: transform 0.2s;
        /*transform: scaleY(0.5);*/
      }

      circle:hover {
        transform: scaleX(1.2) scaleY(0.6);
      }

      text {
        transition: font-size 0.2s;
      }

      g:hover > g > g > text {
        font-size: 1.2em;
      }
    `,
  ],
})
export class TreeComponent implements OnInit {
  @ViewChild('tree', { static: true }) treeEl: ElementRef;
  @ViewChild('treeContainer', { static: true }) treeContainerEl: ElementRef;

  @Input() radius: number;
  @Input() set treeConfig(treeConfig: TreeConfig) {
    this._treeConfig$.next(treeConfig);
  }

  treeHeight$: Observable<number>;
  treeWidth$: Observable<number>;
  viewportWidth$ = new ReplaySubject<number>(1);
  recenter$ = new Subject<void>();

  private _treeConfig$ = new ReplaySubject<TreeConfig>(1);

  constructor(private _amcore: Amcore) {
    this.treeHeight$ = this._treeConfig$.pipe(map((config) => config.height));
    this.treeWidth$ = this._treeConfig$.pipe(map((config) => config.width));
  }

  ngOnInit() {
    const chart$ = this._treeConfig$.pipe(
      switchMap((treeConfig) =>
        this._amcore.createFromConfig({
          element: this.treeEl.nativeElement,
          configFn: () => {
            const colors = [
              '#607d8b',
              '#9c27b0',
              '#03a9f4',
              '#9e49ff',
              '#009688',
              '#e91e63',
              '#8bc34a',
            ];
            return {
              series: [
                {
                  type: 'ForceDirectedSeries',
                  data: treeConfig.nodes.map((node, index) => ({
                    ...node,
                    fixed: true,
                    value: 1,
                    /* Select colors manually because amcharts colors.reuse
                     * doesn't work. */
                    color: colors[index % colors.length],
                  })),
                  dataFields: {
                    id: 'id',
                    name: 'name',
                    value: 'value',
                    children: 'children',
                    fixed: 'fixed',
                    linkWith: 'linkWith',
                    color: 'color',
                  },
                  links: {
                    strokeWidth: 10,
                  },
                  nodes: {
                    fontSize: '.8em',
                    fontWeight: 'bold',
                    label: {
                      text: '{name}',
                      hideOversized: false,
                      truncate: true,
                    },
                    tooltipText: '{name}',
                    propertyFields: {
                      x: 'x',
                      y: 'y',
                    },
                    events: {
                      hit: (event: Event) =>
                        console.log(
                          ((event.target as any).dataItem as DataItem)
                            .dataContext
                        ),
                    },
                  } as ISpriteProperties,
                  minRadius: this.radius,
                  maxRadius: this.radius,
                },
              ],
            };
          },
        })
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    /* Wait for chart to be initialized and use config. */
    const panZoom$ = chart$.pipe(
      switchMap(() => {
        const panZoom = createPanZoom(this.treeEl.nativeElement, {
          bounds: true,
          boundsPadding: 0.2,
          minZoom: 0.5,
          maxZoom: 2,
          smoothScroll: false,
        });

        /* Using `BehaviorSubject` instead of `of` in order to dispose
         * only on error or unsubscribe. */
        return new BehaviorSubject(panZoom).pipe(
          finalize(() => panZoom.dispose())
        );
      })
    );

    const effects$ = merge(
      chart$,
      panZoom$,
      combineLatest([
        panZoom$,
        this._treeConfig$,
        /* Trigger zoom reset the first time. */
        this.recenter$.pipe(startWith(null as void)),
      ]).pipe(
        tap(([panZoom, treeConfig]) => {
          const viewportWidth = this.treeContainerEl.nativeElement.clientWidth;
          panZoom.zoomAbs(0, 0, 1);
          panZoom.moveTo(viewportWidth / 2 - treeConfig.width / 2, 0);
        })
      )
    );

    effects$.pipe(untilDestroyed(this)).subscribe();
  }

  @HostListener('window:resize')
  recenter() {
    this.recenter$.next();
  }
}

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent],
  imports: [CommonModule],
})
export class TreeModule {}
