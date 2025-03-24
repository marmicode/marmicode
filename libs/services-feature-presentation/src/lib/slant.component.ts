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
        display: block;
        margin-top: -50px;
        height: 50px;
        width: 100%;
      }

      svg {
        height: 100%;
        width: 100%;
      }
    `,
    ],
    standalone: true,
})
export class SlantComponent {}

@NgModule({
    exports: [SlantComponent],
    imports: [CommonModule, SlantComponent],
})
export class SlantModule {}
