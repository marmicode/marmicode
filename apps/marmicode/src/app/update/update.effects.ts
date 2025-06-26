import {
  ApplicationRef,
  importProvidersFrom,
  Injectable,
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
  Observable,
  switchMap,
  timer,
} from 'rxjs';
import { UpdateDialogComponent } from './update-dialog.component';

@Injectable()
export class UpdateEffects {
  checkForUpdate$ = createEffect(
    () =>
      /* @hack use `defer()` to create a new observable, otherwise,
       * `createEffect()` will define the '__@ngrx/effects_create__' property on the EMPTY constant.
       * This breaks Angular universal prerender with the following error:
       * "Cannot redefine property: __@ngrx/effects_create__" */
      defer(
        () =>
          this._zone.runOutsideAngular(() =>
            this._swUpdate.isEnabled
              ? this._applicationRef.isStable.pipe(
                  first((isStable) => isStable === true),
                  switchMap(() => timer(0, 30000)),
                  switchMap(() => defer(() => this._swUpdate.checkForUpdate())),
                )
              : EMPTY,
          ),
        /* @hack override type because createEffect's ConditionallyDisallowActionCreator
         * type-safety seems to break if we return an empty observable
         * or something that emits null or undefined. */
      ) as Observable<unknown>,
    {
      dispatch: false,
    },
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
          this._matDialog
            .open(UpdateDialogComponent, {
              backdropClass: 'mc-overlay-backdrop',
            })
            .afterClosed(),
        ),
      ),
    {
      dispatch: false,
    },
  );

  constructor(
    private _applicationRef: ApplicationRef,
    private _matDialog: MatDialog,
    private _swUpdate: SwUpdate,
    private _zone: NgZone,
  ) {}
}

export function provideUpdateEffects() {
  return [UpdateEffects, importProvidersFrom(MatDialogModule)];
}
