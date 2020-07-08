import { Sprite } from '@amcharts/amcharts4/core';
import { Injectable } from '@angular/core';
import { combineLatest, defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    config,
    configFn,
  }: {
    element: HTMLElement;
    config: { [key: string]: unknown };
    configFn?;
  }): Observable<Sprite> {
    return combineLatest([this._core$, this._forceDirectedPluginModule$]).pipe(
      map(([core, plugin]) => {
        const percent = core.percent;
        return core.createFromConfig(
          config || configFn({ percent }),
          element,
          plugin.ForceDirectedTree
        );
      })
    );
  }
}
