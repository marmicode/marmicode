import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { Skill } from './skill';
import { resourceSearchRouterHelper } from './resource-search-router-helper';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-skill-chip',
  template: `
    <a
      class="chip"
      mat-ripple
      [routerLink]="resourceSearchRouterHelper.learn(skill.slug)"
    >
      {{ skill.label }}
    </a>
  `,
  styles: [
    `
      .chip {
        background-color: #f0f0f0;
        border-radius: 16px;
        box-sizing: border-box;
        color: black;
        cursor: pointer;
        display: block;
        font-weight: 500;
        margin: 4px;
        min-height: 32px;
        padding: 7px 12px;
        text-decoration: none;
      }
    `,
  ],
})
export class SkillChipComponent {
  @Input() skill: Skill;

  resourceSearchRouterHelper = resourceSearchRouterHelper;
}

@NgModule({
  declarations: [SkillChipComponent],
  exports: [SkillChipComponent],
  imports: [CommonModule, RouterModule, MatRippleModule],
})
export class SkillChipModule {}
