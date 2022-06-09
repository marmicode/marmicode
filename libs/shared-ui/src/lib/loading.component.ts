import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-loading',
  template: `<img
    [src]="loadingGifUrl"
    class="loading-animation"
    alt="Loading"
  />`,
  styles: [
    `
      :host {
        max-width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    `,
  ],
})
export class LoadingComponent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  loadingGifUrl = require('!!file-loader!./loading.gif').default;
}

@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  imports: [CommonModule],
})
export class LoadingModule {}
