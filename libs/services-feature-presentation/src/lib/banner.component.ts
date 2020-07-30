import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SlantModule } from './slant.component';

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
        We Help You <span class="underline">Cook&nbsp;Better&nbsp;Apps</span>
      </h1>
      <p>with delicious ingredients</p>
      <a href="https://marmicode.eventbrite.com" target="_blank">
        <button mat-raised-button color="primary">
          <mat-icon class="button-icon">school</mat-icon>
          <span>SEE WORKSHOPS</span>
        </button>
      </a>
    </header>
    <mc-slant></mc-slant>
  </div>`,
  styles: [
    `
      .banner-container {
        display: block;
        position: relative;
        height: 600px;
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

      .button-icon {
        margin-right: 10px;
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
  imports: [CommonModule, MatButtonModule, MatIconModule, SlantModule],
})
export class BannerModule {}
