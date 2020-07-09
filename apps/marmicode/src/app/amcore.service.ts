import { Percent, Sprite } from '@amcharts/amcharts4/core';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  defer,
  Observable,
  Subject,
} from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';

export type PercentFn = (value: number) => Percent;

@Injectable({
  providedIn: 'root',
})
export class Amcore {
  private _core$ = combineLatest([
    defer(() => import('@amcharts/amcharts4/core')),
    defer(() => import('@amcharts/amcharts4/themes/material')).pipe(
      map((m) => m.default)
    ),
  ]).pipe(
    map(([core, theme]) => {
      core.useTheme(theme);
      return core;
    })
  );

  private _forceDirectedPluginModule$ = defer(() =>
    import('@amcharts/amcharts4/plugins/forceDirected')
  );

  createFromConfig({
    element,
    configFn,
  }: {
    element: HTMLElement;
    configFn: ({ percent: PercentFn }) => { [key: string]: unknown };
  }): Observable<Sprite> {
    return combineLatest([this._core$, this._forceDirectedPluginModule$]).pipe(
      switchMap(([core, plugin]) => {
        const percent = core.percent;
        const sprite = core.createFromConfig(
          configFn({ percent }),
          element,
          plugin.ForceDirectedTree
        );
        /* Using `BehaviorSubject` instead of `of` in order to dispose
         * only on error or unsubscribe. */
        return new BehaviorSubject<Sprite>(sprite).pipe(
          finalize(() => sprite.dispose())
        );
      })
    );
  }
}
