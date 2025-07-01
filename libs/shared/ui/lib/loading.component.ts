import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { getAssetUri } from '@marmicode/shared/utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-loading',
  template: `<img
    [src]="loadingGifUri"
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
  standalone: true,
})
export class LoadingComponent {
  loadingGifUri = getAssetUri('loading.gif');
}

@NgModule({
  exports: [LoadingComponent],
  imports: [CommonModule, LoadingComponent],
})
export class LoadingModule {}
