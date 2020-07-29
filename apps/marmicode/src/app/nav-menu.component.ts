import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { WipModule } from '@marmicode/shared-utils';
import { BehaviorSubject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-nav-menu',
  template: `
    <div *mcWip fxLayout="row">
      <mat-nav-list fxHide fxShow.gt-sm fxLayout="row" role="menu">
        <a
          *ngFor="let entry of entries"
          [href]="entry.url"
          class="horizontal-menu-item"
          mat-list-item
          role="menuitem"
          target="_blank"
        >
          <mat-icon class="icon">{{ entry.icon }}</mat-icon>
          <span>{{ entry.title }}</span>
        </a>
      </mat-nav-list>

      <button
        *mcWip
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
      <mat-nav-list class="vertical-menu-list" role="menu">
        <a
          *ngFor="let entry of entries"
          [href]="entry.url"
          mat-list-item
          role="menuitem"
          target="_blank"
        >
          <mat-icon class="icon mc-primary-text">{{ entry.icon }}</mat-icon>
          <span class="mc-primary-text">{{ entry.title }}</span>
        </a>
      </mat-nav-list>
    </div>
  `,
  styles: [
    `
      .horizontal-menu-item {
        color: white;
      }

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

      .icon {
        margin-right: 10px;
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
      icon: 'flight_takeof',
      title: 'Services',
      url: 'https://marmicode.eventbrite.com',
    },
    {
      icon: 'mail',
      title: 'Contact Us',
      url: 'https://marmicode.eventbrite.com',
    },
  ];

  toggleMenu() {
    this.isMenuDisplayed$.next(!this.isMenuDisplayed$.value);
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
    WipModule,
  ],
})
export class NavMenuModule {}
