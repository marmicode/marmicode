import { ISpriteProperties } from '@amcharts/amcharts4/core';
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
  defer,
  merge,
  Observable,
  of,
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
  template: ` <div>
      <button type="button" (click)="zoomReset$.next()">RESET</button>
    </div>
    <div
      [style.height.px]="treeHeight$ | async"
      class="chart-container"
      #container
    ></div>`,
  styles: [
    `
      :host {
        display: block;
      }

      .chart-container {
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

  treeHeight$: Observable<number>;
  treeWidth$: Observable<number>;
  viewportWidth$ = new ReplaySubject<number>(1);
  zoomReset$ = new Subject<void>();

  private _treeConfig$ = new ReplaySubject<TreeConfig>(1);

  constructor(private _amcore: Amcore) {
    this.treeHeight$ = this._treeConfig$.pipe(map((config) => config.height));
    this.treeWidth$ = this._treeConfig$.pipe(map((config) => config.width));
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
                },
              ],
            };
          },
        })
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    /* Wait for chart to be initialized and use config. */
    const panZoom$ = combineLatest([
      this._treeConfig$,
      this.viewportWidth$,
      chart$,
    ]).pipe(
      switchMap(([treeConfig, viewportWidth]) => {
        const panZoom = createPanZoom(
          this.containerEl.nativeElement.querySelector('svg'),
          {
            bounds: true,
            boundsPadding: 0.2,
            minZoom: 0.5,
            maxZoom: 2,
            smoothScroll: false,
          }
        );

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
      defer(() =>
        this.viewportWidth$.next(this.containerEl.nativeElement.clientWidth)
      ),
      combineLatest([
        panZoom$,
        this.viewportWidth$,
        this._treeConfig$,
        /* Trigger zoom reset the first time. */
        this.zoomReset$.pipe(startWith(null as void)),
      ]).pipe(
        tap(([panZoom, viewportWidth, treeConfig]) => {
          panZoom.zoomAbs(0, 0, 1);
          panZoom.moveTo(viewportWidth / 2 - treeConfig.width / 2, 0);
        })
      )
    );

    effects$.pipe(untilDestroyed(this)).subscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewportWidth$.next(this.containerEl.nativeElement.clientWidth);
  }
}

@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent],
  imports: [CommonModule],
})
export class TreeModule {}