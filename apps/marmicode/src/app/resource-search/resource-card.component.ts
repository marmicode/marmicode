import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-card',
  template: `🚧 resource-card`,
})
export class ResourceCardComponent {}

@NgModule({
  declarations: [ResourceCardComponent],
  exports: [ResourceCardComponent],
  imports: [CommonModule],
})
export class ResourceCardModule {}
