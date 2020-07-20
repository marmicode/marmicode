import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { ResourceCardModule } from './resource-card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search',
  template: `
    <mc-resource-card></mc-resource-card>
    <mc-resource-card></mc-resource-card>
  `,
})
export class ResourceSearchComponent {}

@NgModule({
  declarations: [ResourceSearchComponent],
  exports: [ResourceSearchComponent],
  imports: [CommonModule, ResourceCardModule],
})
export class ResourceSearchModule {}
