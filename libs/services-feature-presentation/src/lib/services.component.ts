import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { BannerModule } from './banner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-services',
  template: `<mc-banner></mc-banner>
    <div style="height: 300px; color: red">test</div>
    <div style="height: 300px; color: red">test</div>
    <div style="height: 300px; color: red">test</div>`,
  styles: [
    `
      :host {
        z-index: 1;
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
