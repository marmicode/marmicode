import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { skills } from './skills';

const skillList = Object.values(skills);

@Pipe({
  name: 'skillLabel',
})
export class SkillLabelPipe implements PipeTransform {
  transform(skillId: string): string {
    return skillList.find((skill) => skill.id === skillId).label;
  }
}

@NgModule({
  declarations: [SkillLabelPipe],
  exports: [SkillLabelPipe],
  imports: [CommonModule],
})
export class SkillLabelModule {}
