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
      .loading-animation {
        height: 100%;
      }
    `,
  ],
})
export class LoadingComponent {
  loadingGifUrl = require('!!file-loader!./loading.gif');
}

@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  imports: [CommonModule],
})
export class LoadingModule {}
