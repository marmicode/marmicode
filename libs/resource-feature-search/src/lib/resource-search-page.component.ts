import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { resourceSearchRouterHelper } from '@marmicode/shared-router-helpers';
import {
  createBasicPageInfo,
  ErrorModule,
  LoadingModule,
  PageModule,
} from '@marmicode/shared-ui';
import {
  deprogressifyData,
  progressify,
  shareReplayWithRefCount,
  TransferStateHelper,
} from '@marmicode/shared-utils';
import { PushModule } from '@rx-angular/template';
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
  selector: 'mc-resource-search-page',
  template: `
    <mc-page [info]="pageInfo">
      <div class="search-form-container">
        <mc-resource-search-form
          class="resource-search-form"
        ></mc-resource-search-form>
      </div>

      <div class="spinner-error-container">
        <mc-loading *ngIf="isLoading$ | push"></mc-loading>
        <mc-error *ngIf="resourcesNotFound$ | push">
          Sorry! The resources you are looking for haven't been cooked yet.
        </mc-error>
        <mc-error *ngIf="error$ | push"> Oups! Something went wrong. </mc-error>
      </div>
      <div
        *ngIf="(isLoading$ | push) === false"
        class="resource-card-container"
      >
        <mc-resource-card
          *ngFor="let resource of resources$ | push; trackBy: trackById"
          [resource]="resource"
          class="resource-card"
        ></mc-resource-card>
      </div>
    </mc-page>
  `,
  styles: [
    `
      .search-form-container,
      .spinner-error-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      .resource-card-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }

      .resource-search-form {
        margin-top: 10px;
        margin-left: 5px;
        margin-right: 5px;
      }

      .resource-card {
        margin: 20px 5px;
      }
    `,
  ],
})
export class ResourceSearchPageComponent {
  pageInfo = createBasicPageInfo({
    title: 'Resources',
    description: 'JavaScript, Angular & Testing Resources',
  });

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
    const resourcesProgress$ =
      this._resourceSearchFacade.selectedSkillSlug$.pipe(
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
  declarations: [ResourceSearchPageComponent],
  exports: [ResourceSearchPageComponent],
  imports: [
    CommonModule,
    ErrorModule,
    LoadingModule,
    PageModule,
    PushModule,
    ResourceCardModule,
    ResourceRepositoryModule,
    ResourceSearchFormModule,
  ],
})
export class ResourceSearchModule {}
