import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Resource } from './resource';
import { ResourceCardModule } from './resource-card.component';
import { ResourceType } from './resource-type';
import { resources } from './resources';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search',
  template: `
    <section fxLayout="row wrap" fxLayoutAlign="center">
      <mc-resource-card
        *ngFor="let resource of resources"
        [resource]="resource"
        class="mc-resource-card"
      ></mc-resource-card>
    </section>
  `,
  styles: [
    `
      .mc-resource-card {
        margin: 20px;
      }
    `,
  ],
})
export class ResourceSearchComponent {
  resources = resources;
}

@NgModule({
  declarations: [ResourceSearchComponent],
  exports: [ResourceSearchComponent],
  imports: [CommonModule, ResourceCardModule, FlexLayoutModule],
})
export class ResourceSearchModule {}
