import { CommonModule, ViewportScroller } from '@angular/common';
import { Compiler, Component, HostListener, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  animationFrameScheduler,
  BehaviorSubject,
  defer,
  Observable,
} from 'rxjs';
import { map, observeOn, pairwise } from 'rxjs/operators';
import { appRouterHelper } from './app-router-helper';
import { NavMenuModule } from './nav-menu.component';

@Component({
  selector: 'mc-nav',
  template: `
    <!-- Toolbar. -->
    <mat-toolbar
      [class.toolbar-hidden]="isScrollingDown$ | async"
      class="toolbar"
      color="primary"
    >
      <!-- Marmicode logo & text -->
      <a [routerLink]="appRouterHelper.home()" class="marmicode">
        <img class="logo" height="40" src="/assets/logo-white.svg" />
        <span class="title" fxFlexAlign="end" fxHide fxShow.gt-sm
          >Marmicode</span
        >
      </a>

      <!-- Resource search input. -->
      <ng-container *ngIf="resourceSearchForm$ | async as cmpInfo">
        <ng-container
          *ngComponentOutlet="
            cmpInfo.component;
            ngModuleFactory: cmpInfo.ngModule
          "
        ></ng-container>
      </ng-container>

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
        background-color: white;
        display: block;
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
        padding-top: 64px;
      }
    `,
  ],
})
export class NavComponent {
  appRouterHelper = appRouterHelper;
  isScrollingDown$: Observable<boolean>;
  resourceSearchForm$ = defer(async () => {
    const {
      ResourceSearchFormComponent,
      ResourceSearchFormModule,
    } = await import('@marmicode/resource-feature-search');
    return {
      component: ResourceSearchFormComponent,
      ngModule: this._compiler.compileModuleSync(ResourceSearchFormModule),
    };
  });

  private _scrollPosition$ = new BehaviorSubject(0);

  constructor(
    private _compiler: Compiler,
    private _viewportScroller: ViewportScroller
  ) {
    this.isScrollingDown$ = this._scrollPosition$.pipe(
      observeOn(animationFrameScheduler),
      pairwise(),
      map(([previous, current]) => current > 64 && current - previous > 0)
    );
  }

  @HostListener('window:scroll')
  onScroll() {
    this._scrollPosition$.next(this._viewportScroller.getScrollPosition()[1]);
  }
}

@NgModule({
  declarations: [NavComponent],
  exports: [NavComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    NavMenuModule,
    RouterModule,
  ],
})
export class NavModule {}
