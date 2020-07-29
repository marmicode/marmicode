import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-nav-menu',
  template: `<mat-nav-list class="mat-elevation-z1">
    <a mat-list-item href="https://marmicode.eventbrite.com" target="_blank">
      <mat-icon class="icon mc-primary-text">school</mat-icon>
      <span class="mc-primary-text">Workshops</span>
    </a>
    <a mat-list-item href="https://marmicode.eventbrite.com" target="_blank">
      <mat-icon class="icon mc-primary-text">school</mat-icon>
      <span class="mc-primary-text">Workshops</span>
    </a>
  </mat-nav-list>`,
  styles: [
    `
      :host {
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
export class NavMenuComponent {}

@NgModule({
  declarations: [NavMenuComponent],
  exports: [NavMenuComponent],
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class NavMenuModule {}
