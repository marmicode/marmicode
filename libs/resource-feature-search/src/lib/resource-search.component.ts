import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorModule, LoadingModule } from '@marmicode/shared-ui';
import {
  TransferStateHelper,
  deprogressifyData,
  progressify,
  shareReplayWithRefCount,
} from '@marmicode/shared-utils';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import { Resource } from './resource';
import { ResourceCardModule } from './resource-card.component';
import {
  ResourceRepository,
  ResourceRepositoryModule,
} from './resource-repository.service';
import { ResourceSearchFormModule } from './resource-search-form.component';
import { resourceSearchRouterHelper } from '@marmicode/shared-router-helpers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search',
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <mc-loading *ngIf="isLoading$ | async"></mc-loading>
      <mc-error *ngIf="resourcesNotFound$ | async">
        Sorry! The resources you are looking for haven't been cooked yet.
      </mc-error>
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
      :host {
        display: block;
        background-color: white;
      }

      .mc-resource-card {
        margin: 20px;
      }
    `,
  ],
})
export class ResourceSearchComponent {
  isLoading$: Observable<boolean>;
  resources$: Observable<Resource[]>;
  resourcesNotFound$: Observable<boolean>;

  trackById = (index: number, resource: Resource) => resource.id;

  constructor(
    private _resourceRepository: ResourceRepository,
    private _resourceSearchFacade: ResourceSearchFacade,
    private _transferStateHelper: TransferStateHelper
  ) {
    const resourcesProgress$ = this._resourceSearchFacade.selectedSkillSlug$.pipe(
      map((skillSlug) => skillSlug ?? resourceSearchRouterHelper.EVERYTHING),
      switchMap((skillSlug, index) => {
        let source$ =
          skillSlug === resourceSearchRouterHelper.EVERYTHING
            ? this._resourceRepository.getResources()
            : this._resourceRepository.getResourcesBySkillSlug(skillSlug);

        /* Transfer state for the first call only.
         * We run this once to avoid reloading value from state multiple times when slug changes. */
        if (index === 0) {
          source$ = source$.pipe(
            this._transferStateHelper.transfer('resourceSearchResult')
          );
        }

        return source$.pipe(
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

    this.resources$ = resourcesProgress$.pipe(deprogressifyData());

    this.resourcesNotFound$ = combineLatest([
      this.isLoading$,
      this.resources$,
    ]).pipe(
      map(([isLoading, resources]) => {
        return !isLoading && resources?.length === 0;
      })
    );
  }
}

@NgModule({
  declarations: [ResourceSearchComponent],
  exports: [ResourceSearchComponent],
  imports: [
    CommonModule,
    ErrorModule,
    FlexLayoutModule,
    ResourceCardModule,
    ResourceRepositoryModule,
    ResourceSearchFormModule,
    LoadingModule,
  ],
})
export class ResourceSearchModule {}
