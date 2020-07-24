import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search-form',
  template: `🚧 resource-search-form`,
})
export class ResourceSearchFormComponent {}

@NgModule({
  declarations: [ResourceSearchFormComponent],
  exports: [ResourceSearchFormComponent],
  imports: [CommonModule],
})
export class ResourceSearchFormModule {}
