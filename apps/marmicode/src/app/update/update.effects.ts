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
import { first, map, switchMap } from 'rxjs/operators';

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
          combineLatest([
            defer(() => import('@angular/material/dialog')),
            defer(() => import('./update-dialog.component')),
          ])
        ),
        map(([{ MatDialog, MatDialogModule }, { UpdateDialogComponent }]) => {
          const moduleRef = this._compiler
            .compileModuleSync(MatDialogModule)
            .create(this._injector);
          const matDialog = moduleRef.injector.get(MatDialog);
          matDialog.open(UpdateDialogComponent);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _applicationRef: ApplicationRef,
    private _compiler: Compiler,
    private _injector: Injector,
    private _swUpdate: SwUpdate,
    private _zone: NgZone
  ) {}
}
