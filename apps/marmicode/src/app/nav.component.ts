import { CommonModule } from '@angular/common';
import { Component, HostListener, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { animationFrameScheduler, BehaviorSubject, Observable } from 'rxjs';
import { map, observeOn, pairwise } from 'rxjs/operators';

@Component({
  selector: 'mc-nav',
  template: `
    <!-- Toolbar. -->
    <mat-toolbar
      [class.toolbar-hidden]="isScrollingDown$ | async"
      class="toolbar"
      color="primary"
    >
      <ng-container>
        <img height="40" src="/assets/logo-white.svg" />
        <span fxFlexAlign="end" class="title">Marmicode</span>
      </ng-container>
    </mat-toolbar>

    <section class="container">
      <ng-content></ng-content>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        overflow-y: scroll;
      }

      .toolbar {
        position: fixed;
        top: 0;
        transition: top 0.5s;
        z-index: 1;
      }

      .toolbar-hidden {
        top: -64px;
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
