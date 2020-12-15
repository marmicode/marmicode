import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { resourceSearchRouterHelper } from '@marmicode/shared-router-helpers';
import { ErrorModule, LoadingModule, PageModule } from '@marmicode/shared-ui';
import {
  deprogressifyData,
  progressify,
  shareReplayWithRefCount,
  TransferStateHelper,
} from '@marmicode/shared-utils';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import { Resource } from './resource';
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
    <mc-page>
      <div fxLayout="row" fxLayoutAlign="center">
        <mc-resource-search-form
          class="resource-search-form"
        ></mc-resource-search-form>
      </div>

      <div fxLayout="row" fxLayoutAlign="center">
        <mc-loading *ngIf="isLoading$ | async"></mc-loading>
        <mc-error *ngIf="resourcesNotFound$ | async">
          Sorry! The resources you are looking for haven't been cooked yet.
        </mc-error>
        <mc-error *ngIf="error$ | async">
          Oups! Something went wrong.
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
          class="resource-card"
        ></mc-resource-card>
      </div>
    </mc-page>
  `,
  styles: [
    `
      .resource-search-form {
        margin-top: 10px;
        margin-left: 5px;
        margin-right: 5px;
      }

      .resource-card {
        margin: 20px;
      }
    `,
  ],
})
export class ResourceSearchComponent {
  error$: Observable<unknown>;
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
          catchError((err) => {
            console.error(err);
            return throwError(err);
          }),
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

    this.error$ = resourcesProgress$.pipe(map((event) => event.error));

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
    LoadingModule,
    PageModule,
    ResourceCardModule,
    ResourceRepositoryModule,
    ResourceSearchFormModule,
  ],
})
export class ResourceSearchModule {}
