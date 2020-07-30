import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
declare var require;
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-banner',
  template: ` <div
    [style.backgroundImage]="backgroundImage"
    class="banner-container"
  >
    <header class="banner-header">
      <h1>We Help You <span class="underline">Cook Better Apps</span></h1>
      <p>with delicious ingredients</p>
    </header>
  </div>`,
  styles: [
    `
      .banner-container {
        display: block;
        position: relative;
        height: 100vh;
        max-height: 800px;
        width: 100%;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

      .banner-header {
        position: absolute;
        left: 6%;
        top: 30%;
        color: white;
      }

      .underline {
        text-decoration: underline;
        text-decoration-color: #5db3ad;
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
