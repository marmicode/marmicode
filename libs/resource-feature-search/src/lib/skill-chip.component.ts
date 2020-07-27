import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { resourceSearchRouterHelper } from '@marmicode/resource-feature-search';
import { Skill } from './skill';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-skill-chip',
  template: `
    <a class="chip" [routerLink]="resourceSearchRouterHelper.learn(skill.slug)">
      {{ skill.label }}
    </a>
  `,
  styles: [
    `
      .chip {
        background-color: #f0f0f0;
        border-radius: 16px;
        color: black;
        cursor: pointer;
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
  imports: [CommonModule, RouterModule],
})
export class SkillChipModule {}
