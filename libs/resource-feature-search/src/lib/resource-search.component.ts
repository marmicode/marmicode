import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingModule } from '@marmicode/shared-ui';
import {
  dematerializeData,
  progressify,
  shareReplayWithRefCount,
} from '@marmicode/shared-utils';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TransferStateHelper } from '../../../shared-utils/src/lib/transfer-state-helper.service';
import { ResourceSearchFacade } from './+state/resource-search.facade';
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
      <mc-loading *ngIf="isLoading$ | async"></mc-loading>
    </div>
    <div
      *ngIf="(isLoading$ | async) === false"
      fxLayout="row wrap"
      fxLayoutAlign="center"
    >
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
  isLoading$: Observable<boolean>;
  resources$: Observable<Resource[]>;

  trackById = (index, resource: Resource) => resource.id;

  constructor(
    private _resourceRepository: ResourceRepository,
    private _resourceSearchFacade: ResourceSearchFacade,
    private _transferStateHelper: TransferStateHelper
  ) {
    const resourcesProgress$ = this._resourceSearchFacade.selectedSkillSlug$.pipe(
      map((skillSlug) => skillSlug ?? resourceSearchRouterHelper.EVERYTHING),
      switchMap((skillSlug) => {
        const source$ =
          skillSlug === resourceSearchRouterHelper.EVERYTHING
            ? this._resourceRepository.getResources()
            : this._resourceRepository.getResourcesBySkillSlug(skillSlug);

        return source$.pipe(
          this._transferStateHelper.transfer('resourceSearchResult'),
          progressify({
            ignoreComplete: true,
          })
        );
      }),
      shareReplayWithRefCount()
    );

    this.isLoading$ = resourcesProgress$.pipe(
      map((notification) => notification.type === 'started')
    );

    this.resources$ = resourcesProgress$.pipe(dematerializeData());
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
    ResourceSearchFormModule,
    LoadingModule,
  ],
})
export class ResourceSearchModule {}
