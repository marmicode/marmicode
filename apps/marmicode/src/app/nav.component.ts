import { PushPipe } from '@rx-angular/template/push';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener, NgModule } from '@angular/core';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { RouterModule, RouterLink } from '@angular/router';
import {
  animationFrameScheduler,
  asyncScheduler,
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { map, observeOn, pairwise } from 'rxjs/operators';
import { Platform } from '@marmicode/shared/utils';
import { appRouterHelper } from './app-router-helper';
import { NavMenuModule, NavMenuComponent } from './nav-menu.component';

@Component({
  selector: 'mc-nav',
  template: `
    <!-- Toolbar. -->
    <mat-toolbar
      [class.toolbar-hidden]="isScrollingDown$ | push"
      class="toolbar"
      color="primary"
    >
      <!-- Marmicode logo & text -->
      <a [routerLink]="appRouterHelper.home()" class="marmicode">
        <img
          alt="Marmicode Logo"
          class="logo"
          height="40"
          src="/assets/logo-white.svg"
        />
        <span class="mc-hide mc-show-gt-sm title">Marmicode</span>
      </a>

      <!-- Navigation menu. -->
      <mc-nav-menu></mc-nav-menu>
    </mat-toolbar>
    <div class="container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .toolbar {
        height: 64px;
        position: fixed;
        top: 0;
        transition: top 0.5s;
        z-index: 1;
      }

      .toolbar-hidden {
        top: -64px;
      }

      .marmicode {
        color: white;
        margin-right: auto;
        text-decoration: none;
      }

      .logo {
        margin-right: 15px;
      }

      .title {
        margin-bottom: 2px;
      }

      .container {
        /* position relative & z-index 0 prevent code or anything else from overlapping on toolbar. */
        position: relative;
        z-index: 0;

        padding-top: 64px;
        height: calc(100% - 64px);
      }
    `,
  ],
  imports: [MatToolbar, RouterLink, NavMenuComponent, PushPipe],
})
export class NavComponent {
  appRouterHelper = appRouterHelper;
  isScrollingDown$: Observable<boolean>;

  private _scrollPosition$ = new BehaviorSubject(0);

  constructor(
    platform: Platform,
    private _viewportScroller: ViewportScroller,
  ) {
    this.isScrollingDown$ = this._scrollPosition$.pipe(
      observeOn(
        platform.isBrowser() ? animationFrameScheduler : asyncScheduler,
      ),
      pairwise(),
      map(([previous, current]) => current > 64 && current - previous > 0),
    );
  }

  @HostListener('window:scroll')
  onScroll() {
    this._scrollPosition$.next(this._viewportScroller.getScrollPosition()[1]);
  }
}

@NgModule({
  exports: [NavComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    NavMenuModule,
    PushPipe,
    RouterModule,
    NavComponent,
  ],
})
export class NavModule {}
