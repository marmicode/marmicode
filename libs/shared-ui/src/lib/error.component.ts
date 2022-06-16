import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

declare var require: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-error',
  template: `<img
      [src]="pictureUri"
      alt="Sad Marmicode"
      class="error-animation mc-primary-text"
    />
    <div class="error-message">
      <ng-content></ng-content>
    </div> `,
  styles: [
    `
      :host {
        display: flex;
        max-width: 100%;
        flex-direction: column;
        align-items: center;
      }

      .error-animation {
        max-width: 500px;
        width: 100%;
        margin-bottom: 20px;
      }

      .error-message {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-size: 2em;
        font-weight: 300;
        line-height: 1.2;
        text-align: center;
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
