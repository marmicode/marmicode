import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { createSkill, Skill } from './skill';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-search-form',
  template: `
    <mat-form-field>
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
        [autoActiveFirstOption]="true"
        [displayWith]="getSkillLabel"
      >
        <mat-option *ngFor="let skill of skills" [value]="skill">
          {{ skill.label }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  `,
})
export class ResourceSearchFormComponent {
  skillControl = new FormControl();
  skills = [
    createSkill({
      id: 'test',
      label: 'Test',
      slug: 'test',
    }),
    createSkill({
      id: 'test',
      label: 'Test 2',
      slug: 'test 2',
    }),
  ];
  getSkillLabel = (skill: Skill) => skill?.label;

  constructor() {
    this.skillControl.valueChanges.subscribe(console.log);
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
  ],
})
export class ResourceSearchFormModule {}
