import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-services',
  template: `🚧 services`,
})
export class ServicesComponent {}

@NgModule({
  declarations: [ServicesComponent],
  exports: [ServicesComponent],
  imports: [CommonModule],
})
export class ServicesModule {}
