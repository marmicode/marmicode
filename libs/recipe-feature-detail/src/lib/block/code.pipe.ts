import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import * as Prism from 'prismjs';

@Pipe({
  name: 'code',
})
export class CodePipe implements PipeTransform {
  transform(code: string, { language }: { language: string }): SafeHtml {
    return Prism.highlight(code, Prism.languages[language], language);
  }
}

@NgModule({
  declarations: [CodePipe],
  exports: [CodePipe],
  imports: [CommonModule],
})
export class CodePipeModule {}
