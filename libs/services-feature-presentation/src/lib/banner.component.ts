import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

declare var require;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-banner',
  template: `<img
    class="banner-picture"
    [src]="bannerPictureUri"
    alt="Cooking Pot"
  />`,
  styles: [
    `
      :host {
        height: calc(100vh - 64px);
        width: 100%;
      }

      .banner-picture {
        position: fixed;
        top: 0;
      }
    `,
  ],
})
export class BannerComponent {
  bannerPictureUri = require('file-loader!./banner-wide.jpg').default;
}

@NgModule({
  declarations: [BannerComponent],
  exports: [BannerComponent],
  imports: [CommonModule],
})
export class BannerModule {}
