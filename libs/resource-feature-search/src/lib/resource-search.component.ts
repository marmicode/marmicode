import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { WipModule } from '@marmicode/shared-utils';
import { map, switchMap, tap } from 'rxjs/operators';
import { Resource } from './resource';
import { ResourceCardModule } from './resource-card.component';
import {
  ResourceRepository,
  ResourceRepositoryModule,
} from './resource-repository.service';
import { ResourceSearchFormModule } from './resource-search-form.component';
import { resourceSearchRouterHelper } from './resource-search-router-helper';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search',
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <mc-resource-search-form *mcWip></mc-resource-search-form>
    </div>
    <div fxLayout="row wrap" fxLayoutAlign="center">
      <mc-resource-card
        *ngFor="let resource of resources$ | async; trackBy: trackById"
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
  resources$ = this._route.paramMap.pipe(
    map((params) => params.get(resourceSearchRouterHelper.SKILL_SLUG_PARAM)),
    switchMap((skillSlug) => {
      return skillSlug != null
        ? this._resourceRepository.getResourcesBySkillSlug(skillSlug)
        : this._resourceRepository.getResources();
    })
  );

  trackById = (index, resource: Resource) => resource.id;

  constructor(
    private _route: ActivatedRoute,
    private _resourceRepository: ResourceRepository
  ) {}
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
