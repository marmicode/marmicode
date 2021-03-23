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
import { defer, EMPTY, timer } from 'rxjs';
import { exhaustMap, first, switchMap } from 'rxjs/operators';
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
      this._swUpdate.available.pipe(
        /* Retry every 30s. */
        /* repeatWhen(() => interval(30000)) would have been shorter
         * but it didn't play well with fakeAsync. */
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
