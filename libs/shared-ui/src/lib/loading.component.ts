import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-loading',
  template: `<img [src]="loadingGifUrl" alt="Loading" />`,
})
export class LoadingComponent {
  loadingGifUrl = require('!!file-loader!./loading.gif').default;
}

@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  imports: [CommonModule],
})
export class LoadingModule {}
