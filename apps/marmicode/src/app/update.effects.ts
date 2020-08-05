import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { WipService } from '@marmicode/shared-utils';
import { createEffect } from '@ngrx/effects';
import { defer, EMPTY, timer } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdateEffects {
  checkForUpdate$ = createEffect(
    () =>
      this._zone.runOutsideAngular(() =>
        this._wipService.isWip() && this._swUpdate.isEnabled
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
        switchMap(() => defer(() => this._swUpdate.activateUpdate())),
        tap(() => document.location.reload())
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _applicationRef: ApplicationRef,
    private _swUpdate: SwUpdate,
    private _wipService: WipService,
    private _zone: NgZone
  ) {}
}
