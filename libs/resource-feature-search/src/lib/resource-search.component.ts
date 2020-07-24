import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WipModule } from '@marmicode/shared-utils';
import { ResourceCardModule } from './resource-card.component';
import {
  ResourceRepository,
  ResourceRepositoryModule,
} from './resource-repository.service';
import { ResourceSearchFormModule } from './resource-search-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search',
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <mc-resource-search-form *mcWip></mc-resource-search-form>
    </div>
    <div fxLayout="row wrap" fxLayoutAlign="center">
      <mc-resource-card
        *ngFor="let resource of resources$ | async"
        [resource]="resource"
        class="mc-resource-card"
      ></mc-resource-card>
    </div>
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
  resources$ = this._resourceRepository.getResources();

  constructor(private _resourceRepository: ResourceRepository) {}
}

@NgModule({
  declarations: [ResourceSearchComponent],
  exports: [ResourceSearchComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ResourceCardModule,
    ResourceRepositoryModule,
    ResourceSearchFormModule,
    WipModule,
  ],
})
export class ResourceSearchModule {}
