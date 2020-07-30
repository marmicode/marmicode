import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BannerModule } from './banner.component';
import { SlantModule } from './slant.component';

declare var require;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-services',
  template: `<div class="content" [style.backgroundImage]="backgroundImageUrl">
    <mc-banner></mc-banner>
    <mc-slant></mc-slant>
    <div class="services-presentation"></div>
  </div>`,
  styles: [
    `
      .content {
        background-color: #561f4b;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        height: calc(100vh - 64px);
        overflow-y: auto;
      }

      .services-presentation {
        background-color: white;
        height: 1000px;
      }
    `,
  ],
})
export class ServicesComponent {
  backgroundImageUrl = `url(${
    require('!!file-loader!./banner-wide.jpg').default
  })`;
}

@NgModule({
  declarations: [ServicesComponent],
  exports: [ServicesComponent],
  imports: [CommonModule, BannerModule, SlantModule],
})
export class ServicesModule {}
