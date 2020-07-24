import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { resourceSearchRouterHelper } from './resource-search-router-helper';
import { combineLatest, concat, defer, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Skill } from './skill';
import {
  SkillRepository,
  SkillRepositoryModule,
} from './skill-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search-form',
  template: `
    <mat-form-field class="search-input">
      <input
        type="text"
        placeholder="Search by skill"
        aria-label="Number"
        matInput
        [formControl]="skillControl"
        [matAutocomplete]="auto"
      />

      <mat-autocomplete
        #auto="matAutocomplete"
        [displayWith]="getSkillLabel"
        (closed)="onAutoCompleteClose()"
      >
        <mat-option *ngFor="let skill of skills$ | async" [value]="skill">
          {{ skill.label }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  `,
  styles: [
    `
      .search-input {
        width: 300px;
      }
    `,
  ],
})
export class ResourceSearchFormComponent implements OnInit {
  skillControl = new FormControl();
  skills$: Observable<Skill[]>;
  getSkillLabel = (skill: Skill) => skill?.label;

  constructor(
    private _router: Router,
    private _skillRepository: SkillRepository
  ) {
    this.skills$ = combineLatest([
      this._skillRepository.getSkills(),
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
    const navigateToSkill$ = this.skillControl.valueChanges.pipe(
      filter((value) => typeof value !== 'string'),
      switchMap((skill: Skill) =>
        defer(() =>
          this._router.navigate(resourceSearchRouterHelper.learn(skill.slug))
        )
      )
    );

    // navigateToSkill$.pipe(untilDestroyed(this)).subscribe();
    navigateToSkill$.subscribe();
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
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SkillRepositoryModule,
  ],
})
export class ResourceSearchFormModule {}
