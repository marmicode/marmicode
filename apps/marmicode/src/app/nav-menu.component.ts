import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-nav-menu',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 64px;
        width: 100%;
      }
    `,
  ],
})
export class NavMenuComponent {}

@NgModule({
  declarations: [NavMenuComponent],
  exports: [NavMenuComponent],
  imports: [CommonModule],
})
export class NavMenuModule {}
