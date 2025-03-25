import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { resourceSearchRouterHelper } from '@marmicode/shared-router-helpers';
import { RxState } from '@rx-angular/state';
import { PushPipe } from '@rx-angular/template/push';
import { combineLatest, concat, defer, Observable, of } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ResourceSearchStateModule } from './+state/resource-search-state.module';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import {
  SearchInputModule,
  SearchInputComponent,
} from './search-input.component';
import { Skill } from './skill';
import {
  SkillRepository,
  SkillRepositoryModule,
} from './skill-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search-form',
  template: `
    <mc-search-input
      [control]="skillControl"
      [options]="filteredSkills$ | push"
      placeholder="Choose a skill..."
    ></mc-search-input>
  `,
  styles: [
    `
      :host {
        flex: 1;
        max-width: 400px;
      }
    `,
  ],
  providers: [RxState],
  imports: [SearchInputComponent, PushPipe],
})
export class ResourceSearchFormComponent {
  skillControl = new FormControl<Skill | string>(null);
  allSkills$ = this._skillRepository
    .getSkills()
    .pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  filteredSkills$: Observable<Skill[]>;

  constructor(
    private _resourceSearchFacade: ResourceSearchFacade,
    private _router: Router,
    private _skillRepository: SkillRepository,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _state: RxState<any>,
  ) {
    this.filteredSkills$ = combineLatest([
      this.allSkills$,
      concat(
        defer(() => of(this.skillControl.value)),
        this.skillControl.valueChanges,
      ),
    ]).pipe(
      map(([skills, keywords]) => {
        /* Nothing to filter. */
        if (keywords == null) {
          return skills;
        }

        /* These are not keywords but a selected skill. */
        if (typeof keywords !== 'string') {
          return [];
        }

        const keywordsTokenList = this._tokenize(keywords);

        return skills.filter((skill) => {
          /* Tokenize label. */
          const labelTokenList = this._tokenize(skill.label);

          /* Check if all keywords match the label. */
          return keywordsTokenList.every((keywordsToken) =>
            labelTokenList.find((token) => token.startsWith(keywordsToken)),
          );
        });
      }),
    );

    /* @hack forcing type because `filter` doesn't infer type properly. */
    const skillChanges$ = this.skillControl.valueChanges.pipe(
      filter((value) => typeof value !== 'string'),
    ) as Observable<Skill>;

    const navigateToSkill$ = skillChanges$.pipe(
      withLatestFrom(this._resourceSearchFacade.selectedSkillSlug$),
      filter(([skill, selectedSkillSlug]) => {
        selectedSkillSlug =
          selectedSkillSlug === resourceSearchRouterHelper.EVERYTHING
            ? undefined
            : selectedSkillSlug;

        return skill?.slug !== selectedSkillSlug;
      }),
      switchMap(([skill]) =>
        defer(() =>
          this._router.navigate(
            resourceSearchRouterHelper.learn(
              skill?.slug ?? resourceSearchRouterHelper.EVERYTHING,
            ),
          ),
        ),
      ),
    );

    const updateForm$ = combineLatest([
      this._resourceSearchFacade.selectedSkillSlug$,
      this.allSkills$,
    ]).pipe(
      map(([skillSlug, skills]) =>
        skills.find((skill) => skill.slug === skillSlug),
      ),
      tap((skill) => this.skillControl.reset(skill)),
    );

    this._state.hold(navigateToSkill$);
    this._state.hold(updateForm$);
  }

  private _tokenize(text: string) {
    return text.split(' ').map((token) => token.toLowerCase());
  }
}

@NgModule({
  exports: [ResourceSearchFormComponent],
  imports: [
    CommonModule,
    PushPipe,
    ResourceSearchStateModule,
    SkillRepositoryModule,
    SearchInputModule,
    ResourceSearchFormComponent,
  ],
})
export class ResourceSearchFormModule {}
