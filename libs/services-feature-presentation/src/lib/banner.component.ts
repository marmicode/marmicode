import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  NgModule,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WorkshopsButtonModule } from './workshops-button.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let require: any;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-banner',
  template: ` <header class="banner-header">
    <h1 class="title">
      We Help You <span class="underline">Cook&nbsp;Better&nbsp;Apps</span>
    </h1>
    <p>with delicious ingredients</p>
    <mc-workshops-button></mc-workshops-button>
  </header>`,
  styles: [
    `
      :host {
        display: block;
        height: 600px;
        width: 100%;

        background-color: #561f4b;
        background-attachment: fixed;
        background-position: center;
        background-size: cover;
      }

      .banner-header {
        padding-top: 150px;
        padding-left: 6%;

        color: white;
        font-family: Times, 'Helvetica Neue', sans-serif;
        font-size: 2em;
        font-weight: 700;
        line-height: 2em;
      }

      @media (min-width: 960px) {
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
  @HostBinding('style.backgroundImage')
  backgroundImage = `url(${
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('!!file-loader!./banner-wide-1024.jpg').default
  })`;
}

@NgModule({
  declarations: [BannerComponent],
  exports: [BannerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    WorkshopsButtonModule,
  ],
})
export class BannerModule {}
