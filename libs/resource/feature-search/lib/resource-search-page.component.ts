import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, inject } from '@angular/core';
import { resourceSearchRouterHelper } from '@marmicode/shared/router-helpers';
import {
  createBasicPageInfo,
  ErrorModule,
  LoadingModule,
  PageModule,
} from '@marmicode/shared/ui';
import {
  deprogressifyData,
  progressify,
  shareReplayWithRefCount,
  TransferStateHelper,
} from '@marmicode/shared/utils';
import { PushPipe } from '@rx-angular/template/push';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import { Resource } from './resource';
import {
  ResourceCardModule,
  ResourceCardComponent,
} from './resource-card.component';
import {
  ResourceRepository,
  ResourceRepositoryModule,
} from './resource-repository.service';
import {
  ResourceSearchFormModule,
  ResourceSearchFormComponent,
} from './resource-search-form.component';
import { PageComponent } from '@marmicode/shared/ui';
import { LoadingComponent } from '@marmicode/shared/ui';
import { ErrorComponent } from '@marmicode/shared/ui';

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
        @if (isLoading$ | push) {
          <mc-loading></mc-loading>
        }
        @if (resourcesNotFound$ | push) {
          <mc-error>
            Sorry! The resources you are looking for haven't been cooked yet.
          </mc-error>
        }
        @if (error$ | push) {
          <mc-error> Oups! Something went wrong. </mc-error>
        }
      </div>
      @if ((isLoading$ | push) === false) {
        <div
          class="resource-card-container"
          >
          @for (resource of resources$ | push; track trackById($index, resource)) {
            <mc-resource-card
              [resource]="resource"
              class="resource-card"
            ></mc-resource-card>
          }
        </div>
      }
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
  imports: [
    PageComponent,
    ResourceSearchFormComponent,
    LoadingComponent,
    ErrorComponent,
    ResourceCardComponent,
    PushPipe
],
})
export class ResourceSearchPageComponent {
  private _resourceRepository = inject(ResourceRepository);
  private _resourceSearchFacade = inject(ResourceSearchFacade);
  private _transferStateHelper = inject(TransferStateHelper);

  pageInfo = createBasicPageInfo({
    title: 'Resources',
    description: 'JavaScript, Angular & Testing Resources',
  });

  error$: Observable<unknown>;
  isLoading$: Observable<boolean>;
  resources$: Observable<Resource[]>;
  resourcesNotFound$: Observable<boolean>;

  trackById = (index: number, resource: Resource) => resource.id;

  constructor() {
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
              this._transferStateHelper.transfer('resourceSearchResult'),
            );
          }

          return source$.pipe(
            catchError((err) => {
              console.error(err);
              return throwError(err);
            }),
            progressify({
              ignoreComplete: true,
            }),
          );
        }),
        shareReplayWithRefCount(),
      );

    this.isLoading$ = resourcesProgress$.pipe(
      map((notification) => notification.type === 'started'),
    );

    this.resources$ = resourcesProgress$.pipe(deprogressifyData());

    this.error$ = resourcesProgress$.pipe(map((event) => event.error));

    this.resourcesNotFound$ = combineLatest([
      this.isLoading$,
      this.resources$,
    ]).pipe(
      map(([isLoading, resources]) => {
        return !isLoading && resources?.length === 0;
      }),
    );
  }
}

@NgModule({
  exports: [ResourceSearchPageComponent],
  imports: [
    CommonModule,
    ErrorModule,
    LoadingModule,
    PageModule,
    PushPipe,
    ResourceCardModule,
    ResourceRepositoryModule,
    ResourceSearchFormModule,
    ResourceSearchPageComponent,
  ],
})
export class ResourceSearchModule {}
