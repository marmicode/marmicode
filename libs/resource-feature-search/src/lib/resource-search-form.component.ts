import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, concat, defer, Observable, of } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ResourceSearchStateModule } from './+state/resource-search-state.module';
import { ResourceSearchFacade } from './+state/resource-search.facade';
import { resourceSearchRouterHelper } from './resource-search-router-helper';
import { SearchInputModule } from './search-input.component';
import { Skill } from './skill';
import {
  SkillRepository,
  SkillRepositoryModule,
} from './skill-repository.service';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search-form',
  template: `
    <mc-search-input
      [control]="skillControl"
      [options]="filteredSkills$ | async"
    ></mc-search-input>
  `,
})
export class ResourceSearchFormComponent implements OnInit {
  skillControl = new FormControl();
  allSkills$ = this._skillRepository
    .getSkills()
    .pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  filteredSkills$: Observable<Skill[]>;

  constructor(
    private _resourceSearchFacade: ResourceSearchFacade,
    private _router: Router,
    private _skillRepository: SkillRepository
  ) {
    this.filteredSkills$ = combineLatest([
      this.allSkills$,
      concat(
        defer(() => of(this.skillControl.value)),
        this.skillControl.valueChanges
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
            labelTokenList.find((token) => token.startsWith(keywordsToken))
          );
        });
      })
    );
  }

  ngOnInit() {
    const selectedSkill$ = this.skillControl.valueChanges.pipe(
      filter((value) => typeof value !== 'string')
    );

    const navigateToSkill$ = selectedSkill$.pipe(
      switchMap((skill: Skill) =>
        defer(() =>
          this._router.navigate(
            resourceSearchRouterHelper.learn(
              skill?.slug ?? resourceSearchRouterHelper.EVERYTHING
            )
          )
        )
      )
    );

    const skillSlug$ = this._resourceSearchFacade.selectedSkillSlug$;

    const updateForm$ = combineLatest([skillSlug$, this.allSkills$]).pipe(
      map(([skillSlug, skills]) =>
        skills.find((skill) => skill.slug === skillSlug)
      ),
      tap((skill) =>
        this.skillControl.setValue(skill, {
          emitEvent: false,
        })
      )
    );

    combineLatest([navigateToSkill$, updateForm$])
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  onAutoCompleteClose() {
    /* Reset auto complete if input is not a skill. */
    if (this.skillControl.value?.id == null) {
      this.skillControl.reset();
    }
  }

  private _tokenize(text: string) {
    return text.split(' ').map((token) => token.toLowerCase());
  }
}

@NgModule({
  declarations: [ResourceSearchFormComponent],
  exports: [ResourceSearchFormComponent],
  imports: [
    CommonModule,
    ResourceSearchStateModule,
    SkillRepositoryModule,
    SearchInputModule,
  ],
})
export class ResourceSearchFormModule {}
