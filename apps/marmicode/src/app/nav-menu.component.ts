import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BehaviorSubject } from 'rxjs';
import { NavMenuItemModule } from './nav-menu-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-nav-menu',
  template: `
    <div fxLayout="row">
      <mat-nav-list fxHide fxShow.gt-sm fxLayout="row" role="menu">
        <mc-nav-menu-item
          *ngFor="let entry of entries"
          [entry]="entry"
        ></mc-nav-menu-item>
      </mat-nav-list>

      <button
        (click)="toggleMenu()"
        aria-haspopup="true"
        fxHide.gt-sm
        mat-button
      >
        <mat-icon>menu</mat-icon>
      </button>
    </div>

    <!-- Overlay menu. -->
    <div
      *ngIf="isMenuDisplayed$ | async"
      class="vertical-menu mat-elevation-z1"
      fxHide.gt-sm
    >
      <mat-nav-list
        class="vertical-menu-list"
        data-role="vertical-menu"
        role="menu"
      >
        <mc-nav-menu-item
          *ngFor="let entry of entries"
          [entry]="entry"
          (click)="closeMenu()"
          color="primary"
        ></mc-nav-menu-item>
      </mat-nav-list>
    </div>
  `,
  styles: [
    `
      .vertical-menu {
        display: flex;
        flex-direction: column;

        position: absolute;
        top: 64px;
        left: 0;
        width: 100%;

        background-color: white;
      }

      .vertical-menu-list {
        margin: auto;
      }
    `,
  ],
})
export class NavMenuComponent {
  isMenuDisplayed$ = new BehaviorSubject<boolean>(false);

  entries = [
    {
      icon: 'school',
      title: 'Workshops',
      url: 'https://marmicode.eventbrite.com',
    },
    {
      icon: 'mail',
      title: 'Contact Us',
      url: 'mailto:kitchen@marmicode.io',
    },
  ];

  toggleMenu() {
    this.isMenuDisplayed$.next(!this.isMenuDisplayed$.value);
  }

  closeMenu() {
    this.isMenuDisplayed$.next(false);
  }
}

@NgModule({
  declarations: [NavMenuComponent],
  exports: [NavMenuComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NavMenuItemModule,
  ],
})
export class NavMenuModule {}
