import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { createSkill, Skill } from './skill';
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
export class ResourceSearchFormComponent {
  skillControl = new FormControl();
  skills$ = this._skillRepository.getSkills();
  getSkillLabel = (skill: Skill) => skill?.label;

  constructor(private _skillRepository: SkillRepository) {}

  onAutoCompleteClose() {
    /* Reset auto complete if input is not a skill. */
    if (this.skillControl.value?.id == null) {
      this.skillControl.reset();
    }
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
