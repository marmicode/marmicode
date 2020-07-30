import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-banner',
  template: ` <header class="banner-header">
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
  </header>`,
  styles: [
    `
      :host {
        display: block;
        height: 600px;
        width: 100%;
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
export class BannerComponent {}

@NgModule({
  declarations: [BannerComponent],
  exports: [BannerComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class BannerModule {}
