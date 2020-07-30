import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BannerModule } from './banner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-services',
  template: `<mc-banner></mc-banner>
    <div class="services-presentation"></div>`,
  styles: [
    `
      .services-presentation {
        height: 1000px;
      }
    `,
  ],
})
export class ServicesComponent {}

@NgModule({
  declarations: [ServicesComponent],
  exports: [ServicesComponent],
  imports: [CommonModule, BannerModule],
})
export class ServicesModule {}
