import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'mc-nav',
  template: `
    <!-- Toolbar. -->
    <mat-toolbar color="primary">
      <button
        type="button"
        aria-label="Toggle sidenav"
        mat-icon-button
        (click)="toggleSidenav()"
        *ngIf="isHandset$ | async"
      >
        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
      </button>
      <ng-container *ngIf="(isHandset$ | async) === false">
        <img height="40" src="/assets/logo-white.svg" />
        <span fxFlexAlign="end" class="title">Marmicode</span>
      </ng-container>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <!-- Sidenav. -->
      <mat-sidenav
        class="sidenav"
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="isSidenavOpen$ | async"
      >
        <mat-nav-list (click)="closeSidenav()">
          <a mat-list-item routerLink="/learning-map">Learning Map</a>
          <a mat-list-item routerLink="/search">Search</a>
        </mat-nav-list>
      </mat-sidenav>

      <!-- Content. -->
      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidenav-container {
        height: calc(100% - 64px);
      }

      .sidenav {
        width: 200px;
      }

      .title {
        margin-left: 15px;
        margin-bottom: 2px;
      }
    `,
  ],
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  /* State of sidenav. */
  isSidenavOpen$: Observable<boolean>;
  /* Internal state of sidenav. */
  private _isSidenavOpen$ = new BehaviorSubject<boolean>(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isSidenavOpen$ = combineLatest([
      this._isSidenavOpen$,
      this.isHandset$,
    ]).pipe(
      map(([isSidenavOpen, isHandset]) => {
        if (!isHandset) {
          return true;
        }
        return isSidenavOpen;
      })
    );
  }

  closeSidenav() {
    this._isSidenavOpen$.next(false);
  }

  toggleSidenav() {
    this._isSidenavOpen$.next(!this._isSidenavOpen$.value);
  }
}

@NgModule({
  declarations: [NavComponent],
  exports: [NavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    FlexModule,
  ],
})
export class NavModule {}
