import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

declare var require: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-error',
  template: `<img
    [src]="pictureUri"
    alt="Sad Marmicode"
    class="error-animation"
  />`,
  styles: [
    `
      :host {
        max-width: 100%;
      }

      .error-animation {
        width: 100%;
      }
    `,
  ],
})
export class ErrorComponent {
  pictureUri = require('!!file-loader!./error.gif').default;
}

@NgModule({
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
  imports: [CommonModule],
})
export class ErrorModule {}
