import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-nav-menu',
  template: `<mat-nav-list>
    <ng-content></ng-content>
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
    `,
  ],
})
export class NavMenuComponent {}

@NgModule({
  declarations: [NavMenuComponent],
  exports: [NavMenuComponent],
  imports: [CommonModule, MatListModule],
})
export class NavMenuModule {}
