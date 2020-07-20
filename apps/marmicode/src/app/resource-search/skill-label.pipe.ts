import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillLabel',
})
export class SkillLabelPipe implements PipeTransform {
  transform(skillId: string): string {
    return skillId;
  }
}

@NgModule({
  declarations: [SkillLabelPipe],
  exports: [SkillLabelPipe],
  imports: [CommonModule],
})
export class SkillLabelModule {}
