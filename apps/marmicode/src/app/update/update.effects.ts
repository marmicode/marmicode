import {
  ApplicationRef,
  Compiler,
  Injectable,
  Injector,
  NgZone,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { createEffect } from '@ngrx/effects';
import {
  defer,
  EMPTY,
  exhaustMap,
  filter,
  first,
  switchMap,
  timer,
} from 'rxjs';
import { UpdateDialogComponent } from './update-dialog.component';

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
      this._swUpdate.versionUpdates.pipe(
        filter((update) => update.type === 'VERSION_READY'),
        /* Keep prompting user every 30s.
         * Otherwise, we might have some trouble if user keeps using an old version.
         * Even though `checkForUpdate` is triggered every 30s, it will probably
         * trigger `versionUpdates` only once. */
        switchMap(() => timer(0, 30000)),
        /* Wait for dialog to be close to avoid opening multiple dialogs. */
        exhaustMap(() =>
          this._getDialogService()
            .open(UpdateDialogComponent, {
              backdropClass: 'mc-overlay-backdrop',
            })
            .afterClosed()
        )
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

  private _getDialogService(): MatDialog {
    const moduleRef = this._compiler
      .compileModuleSync(MatDialogModule)
      .create(this._injector);
    return moduleRef.injector.get(MatDialog);
  }
}
