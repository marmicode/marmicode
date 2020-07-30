import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-slant',
  template: ` <svg preserveAspectRatio="none" viewBox="0 0 100 100">
    <polygon style="fill: white" points="0,0 0,100 100,100" />
  </svg>`,
  styles: [
    `
      :host {
        position: absolute;
        bottom: 0;
        height: 50px;
        width: 100%;
      }

      svg {
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class SlantComponent {}

@NgModule({
  declarations: [SlantComponent],
  exports: [SlantComponent],
  imports: [CommonModule],
})
export class SlantModule {}
