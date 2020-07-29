import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { WipModule } from '@marmicode/shared-utils';
import { BehaviorSubject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-nav-menu',
  template: `
    <button *mcWip mat-button (click)="toggleMenu()">
      <mat-icon>menu</mat-icon>
    </button>

    <!-- Overlay menu. -->
    <div *ngIf="isMenuDisplayed$ | async" class="menu mat-elevation-z1">
      <mat-nav-list *ngIf="isMenuDisplayed$ | async" class="menu-list">
        <a
          *ngFor="let entry of entries"
          [href]="entry.url"
          mat-list-item
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
      .menu {
        display: flex;
        flex-direction: column;

        position: absolute;
        top: 64px;
        left: 0;
        width: 100%;

        background-color: white;
      }

      .menu-list {
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
      icon: 'school',
      title: 'Workshops',
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
    MatListModule,
    MatIconModule,
    MatButtonModule,
    WipModule,
    FlexModule,
  ],
})
export class NavMenuModule {}
