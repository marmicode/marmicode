import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Skill } from './skill';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-skill-chip',
  template: ` <mat-chip [disabled]="true" [style.opacity]="1">
    {{ skill.label }}
  </mat-chip>`,
})
export class SkillChipComponent {
  @Input() skill: Skill;
}

@NgModule({
  declarations: [SkillChipComponent],
  exports: [SkillChipComponent],
  imports: [CommonModule, MatChipsModule],
})
export class SkillChipModule {}
