import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

declare var require;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-banner',
  template: ` <div
    [style.backgroundImage]="backgroundImage"
    class="banner-container"
  >
    <header class="banner-header">
      <h1 class="title">
        We Help You <span class="underline">Cook Better Apps</span>
      </h1>
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
        font-family: Times, 'Helvetica Neue', sans-serif;
        font-size: 2em;
        font-weight: 700;
        line-height: 2em;
      }

      @media (min-width: 900px) {
        .banner-header {
          font-size: 3em;
        }
      }

      .title {
        font-family: inherit;
        font-size: 1.2em;
        font-weight: 700;
        line-height: inherit;
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
