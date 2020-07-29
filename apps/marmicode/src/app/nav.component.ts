import { CommonModule } from '@angular/common';
import { Component, HostListener, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ResourceSearchFormModule } from '@marmicode/resource-feature-search';
import { animationFrameScheduler, BehaviorSubject, Observable } from 'rxjs';
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
        <img height="40" src="/assets/logo-white.svg" />
        <span fxFlexAlign="end" class="title">Marmicode</span>
      </a>

      <!-- Flex separator. -->
      <div fxFlex></div>

      <!-- Resource search input. -->
      <mc-resource-search-form></mc-resource-search-form>

      <!-- Navigation menu. -->
      <mc-nav-menu></mc-nav-menu>
    </mat-toolbar>
    <section class="container">
      <ng-content></ng-content>
    </section>
  `,
  styles: [
    `
      :host {
        background-color: white;
        display: block;
        height: 100%;
        overflow-y: scroll;
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
        text-decoration: none;
      }

      .title {
        margin-left: 15px;
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

  private _scrollPosition$ = new BehaviorSubject(0);

  constructor() {
    this.isScrollingDown$ = this._scrollPosition$.pipe(
      observeOn(animationFrameScheduler),
      pairwise(),
      map(([previous, current]) => current > 64 && current - previous > 0)
    );
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    this._scrollPosition$.next((event.target as HTMLElement).scrollTop);
  }
}

@NgModule({
  declarations: [NavComponent],
  exports: [NavComponent],
  imports: [
    CommonModule,
    FlexModule,
    MatToolbarModule,
    NavMenuModule,
    RouterModule,
    ResourceSearchFormModule,
  ],
})
export class NavModule {}
