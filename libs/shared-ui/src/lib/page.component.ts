import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-page',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: block;
        background-color: white;
        min-height: 100%;
      }
    `,
  ],
})
export class PageComponent {}

@NgModule({
  declarations: [PageComponent],
  exports: [PageComponent],
  imports: [CommonModule],
})
export class PageModule {}
