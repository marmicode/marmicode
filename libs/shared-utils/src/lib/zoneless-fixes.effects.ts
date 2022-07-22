import { ApplicationRef, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { createEffect } from '@ngrx/effects';
import { filter } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ZonelessFixesEffects {
  triggerChangeDetection = createEffect(
    () => {
      return this._router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        tap(() => this._appRef.tick())
      );
    },
    {
      dispatch: false,
    }
  );

  constructor(private _appRef: ApplicationRef, private _router: Router) {}
}
