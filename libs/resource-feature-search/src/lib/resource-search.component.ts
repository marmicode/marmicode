import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import {
  dematerializeData,
  progressify,
  shareReplayWithRefCount,
} from '@marmicode/shared-utils';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadingModule } from '@marmicode/shared-ui';
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
      <mc-resource-search-form></mc-resource-search-form>
    </div>
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
  animations: [
    trigger('scaleOut', [
      state(
        'void',
        style({
          height: 0,
        })
      ),
      transition('* => void', [animate('.2s')]),
    ]),
  ],
})
export class ResourceSearchComponent {
  isLoading$: Observable<boolean>;
  resources$: Observable<Resource[]>;

  trackById = (index, resource: Resource) => resource.id;

  constructor(
    private _route: ActivatedRoute,
    private _resourceRepository: ResourceRepository
  ) {
    const resourcesProgress$ = this._route.paramMap.pipe(
      map((params) => params.get(resourceSearchRouterHelper.SKILL_SLUG_PARAM)),
      switchMap((skillSlug) => {
        const source$ =
          skillSlug != null
            ? this._resourceRepository.getResourcesBySkillSlug(skillSlug)
            : this._resourceRepository.getResources();

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
