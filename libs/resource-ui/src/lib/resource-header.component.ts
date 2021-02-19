import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-header',
  template: `🚧 resource-header`,
})
export class ResourceHeaderComponent {}

@NgModule({
  declarations: [ResourceHeaderComponent],
  exports: [ResourceHeaderComponent],
  imports: [CommonModule],
})
export class ResourceHeaderModule {}
