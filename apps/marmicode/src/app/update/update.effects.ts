import {
  ApplicationRef,
  Compiler,
  Injectable,
  Injector,
  NgZone,
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { createEffect } from '@ngrx/effects';
import { combineLatest, defer, EMPTY, timer } from 'rxjs';
import {
  exhaustMap,
  first,
  map,
  mapTo,
  shareReplay,
  switchMap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdateEffects {
  checkForUpdate$ = createEffect(
    () =>
      this._zone.runOutsideAngular(() =>
        this._swUpdate.isEnabled
          ? this._applicationRef.isStable.pipe(
              first((isStable) => isStable === true),
              switchMap(() => timer(0, 30000)),
              switchMap(() => defer(() => this._swUpdate.checkForUpdate()))
            )
          : EMPTY
      ),
    {
      dispatch: false,
    }
  );

  update$ = createEffect(
    () =>
      this._swUpdate.available.pipe(
        switchMap(() =>
          combineLatest([this._dialog$, this._updateDialogComponent$])
        ),
        /* Retry every 30s. */
        /* repeatWhen(() => interval(30000)) would have been shorter
         * but it didn't play well with fakeAsync. */
        switchMap((args) => timer(0, 30000).pipe(mapTo(args))),
        /* Wait for dialog to be close to avoid opening multiple dialogs. */
        exhaustMap(([dialog, updateDialogComponent]) =>
          dialog
            .open(updateDialogComponent, {
              backdropClass: 'mc-overlay-backdrop',
            })
            .afterClosed()
        )
      ),
    {
      dispatch: false,
    }
  );

  private _dialog$ = defer(() => import('@angular/material/dialog')).pipe(
    map(({ MatDialog, MatDialogModule }) => {
      const moduleRef = this._compiler
        .compileModuleSync(MatDialogModule)
        .create(this._injector);
      return moduleRef.injector.get(MatDialog);
    }),
    shareReplay()
  );

  private _updateDialogComponent$ = defer(() =>
    import('./update-dialog.component')
  ).pipe(
    map(({ UpdateDialogComponent }) => UpdateDialogComponent),
    shareReplay()
  );

  constructor(
    private _applicationRef: ApplicationRef,
    private _compiler: Compiler,
    private _injector: Injector,
    private _swUpdate: SwUpdate,
    private _zone: NgZone
  ) {}
}