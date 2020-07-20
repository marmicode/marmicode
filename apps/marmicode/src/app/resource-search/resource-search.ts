import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResourceCardModule } from './resource-card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search',
  template: `
    <section fxLayout="row wrap" fxLayoutAlign="space-around">
      <mc-resource-card></mc-resource-card>
      <mc-resource-card></mc-resource-card>
      <mc-resource-card></mc-resource-card>
      <mc-resource-card></mc-resource-card>
      <mc-resource-card></mc-resource-card>
    </section>
  `,
})
export class ResourceSearchComponent {}

@NgModule({
  declarations: [ResourceSearchComponent],
  exports: [ResourceSearchComponent],
  imports: [CommonModule, ResourceCardModule, FlexLayoutModule],
})
export class ResourceSearchModule {}
