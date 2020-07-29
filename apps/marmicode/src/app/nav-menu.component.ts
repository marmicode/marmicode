import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
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

    <mat-nav-list
      *ngIf="isMenuDisplayed$ | async"
      class="menu mat-elevation-z1"
    >
      <a mat-list-item href="https://marmicode.eventbrite.com" target="_blank">
        <mat-icon class="icon mc-primary-text">school</mat-icon>
        <span class="mc-primary-text">Workshops</span>
      </a>
      <a mat-list-item href="https://marmicode.eventbrite.com" target="_blank">
        <mat-icon class="icon mc-primary-text">school</mat-icon>
        <span class="mc-primary-text">Workshops</span>
      </a>
    </mat-nav-list>
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

      .icon {
        margin-right: 10px;
      }
    `,
  ],
})
export class NavMenuComponent {
  isMenuDisplayed$ = new BehaviorSubject<boolean>(false);

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
  ],
})
export class NavMenuModule {}
