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
    <mat-toolbar class="toolbar" color="primary">
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
      .toolbar {
        position: fixed;
        top: 0;
        z-index: 1;
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
export class NavComponent {}

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
