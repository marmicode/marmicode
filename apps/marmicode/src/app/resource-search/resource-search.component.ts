import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResourceCardModule } from './resource-card.component';
import {
  ResourceRepository,
  ResourceRepositoryModule,
} from './resource-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search',
  template: `
    <section fxLayout="row wrap" fxLayoutAlign="center">
      <mc-resource-card
        *ngFor="let resource of resources$ | async"
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
  resources$ = of(resources);
  // resources$ = this._resourceRepository.getResources();

  constructor(private _resourceRepository: ResourceRepository) {
    this._resourceRepository.getResources().subscribe(console.log);
  }
}

@NgModule({
  declarations: [ResourceSearchComponent],
  exports: [ResourceSearchComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ResourceCardModule,
    ResourceRepositoryModule,
  ],
})
export class ResourceSearchModule {}
