import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { skills } from './skills';

@Pipe({
  name: 'skillLabel',
})
export class SkillLabelPipe implements PipeTransform {
  transform(skillId: string): string {
    return skills.find((skill) => skill.id === skillId).label;
  }
}

@NgModule({
  declarations: [SkillLabelPipe],
  exports: [SkillLabelPipe],
  imports: [CommonModule],
})
export class SkillLabelModule {}
