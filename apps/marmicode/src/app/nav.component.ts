import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  animationFrameScheduler,
  of,
} from 'rxjs';
import {
  map,
  shareReplay,
  observeOn,
  pairwise,
  tap,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'mc-nav',
  template: `
    <!-- Toolbar. -->
    <mat-toolbar
      [class.toolbar-hidden]="(isToolbarDisplayed$ | async) === false"
      class="toolbar"
      color="primary"
    >
      <button
        *ngIf="isHandset$ | async"
        (click)="toggleSidenav()"
        type="button"
        aria-label="Toggle sidenav"
        mat-icon-button
      >
        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
      </button>
      <ng-container *ngIf="(isHandset$ | async) === false">
        <img height="40" src="/assets/logo-white.svg" />
        <span fxFlexAlign="end" class="title">Marmicode</span>
      </ng-container>
    </mat-toolbar>

    <mat-sidenav-container
      [class.no-toolbar]="(isToolbarDisplayed$ | async) === false"
      class="sidenav-container"
    >
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
      <mat-sidenav-content (scroll)="onScroll($event)">
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .toolbar {
        transition: height 0.3s;
      }

      .toolbar-hidden {
        height: 0;
      }

      .sidenav-container {
        transition: height 0.3s;
        height: calc(100% - 64px);
      }

      .sidenav-container.no-toolbar {
        height: 100%;
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
export class NavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isToolbarDisplayed$: Observable<boolean>;
  /* State of sidenav. */
  isSidenavOpen$: Observable<boolean>;
  /* Internal state of sidenav. */
  private _isSidenavOpen$ = new BehaviorSubject<boolean>(false);

  private _scrollPosition$ = new BehaviorSubject<number>(0);

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

    const isScrollingUp$ = this._scrollPosition$.pipe(
      observeOn(animationFrameScheduler),
      pairwise(),
      map(([previous, current]) => current - previous <= 0)
    );

    this.isToolbarDisplayed$ = this.isHandset$.pipe(
      switchMap((isHandset) => {
        if (!isHandset) {
          return of(true);
        }

        return isScrollingUp$;
      })
    );
  }

  ngOnInit() {}

  closeSidenav() {
    this._isSidenavOpen$.next(false);
  }

  toggleSidenav() {
    this._isSidenavOpen$.next(!this._isSidenavOpen$.value);
  }

  onScroll(event) {
    this._scrollPosition$.next(event.target.scrollTop);
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
