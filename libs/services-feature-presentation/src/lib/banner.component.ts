import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
declare var require;
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-banner',
  template: `<div
    [style.backgroundImage]="backgroundImage"
    class="banner-container"
  ></div>`,
  styles: [
    `
      .banner-container {
        display: block;
        height: 100vh;
        max-height: 800px;
        width: 100%;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    `,
  ],
})
export class BannerComponent {
  backgroundImage = `url(${
    require('!!file-loader!./banner-wide.jpg').default
  })`;
}

@NgModule({
  declarations: [BannerComponent],
  exports: [BannerComponent],
  imports: [CommonModule],
})
export class BannerModule {}
