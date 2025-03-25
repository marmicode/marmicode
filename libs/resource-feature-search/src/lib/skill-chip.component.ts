import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MatRippleModule, MatRipple } from '@angular/material/core';
import { RouterModule, RouterLinkActive, RouterLink } from '@angular/router';
import { Skill } from './skill';
import { resourceSearchRouterHelper } from '@marmicode/shared-router-helpers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-skill-chip',
  template: `
    <a
      [routerLink]="resourceSearchRouterHelper.learn(skill.slug)"
      class="chip"
      mat-ripple
      routerLinkActive="disabled"
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

      .chip.disabled {
        background-color: #f9f9f9;
        color: #888;
        cursor: inherit;
      }
    `,
  ],
  imports: [MatRipple, RouterLinkActive, RouterLink],
})
export class SkillChipComponent {
  @Input() skill: Skill;

  resourceSearchRouterHelper = resourceSearchRouterHelper;
}

@NgModule({
  exports: [SkillChipComponent],
  imports: [CommonModule, RouterModule, MatRippleModule, SkillChipComponent],
})
export class SkillChipModule {}
