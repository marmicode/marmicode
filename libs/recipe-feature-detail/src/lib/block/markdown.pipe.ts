import { CommonModule } from '@angular/common';
import {
  NgModule,
  Pipe,
  PipeTransform,
  Sanitizer,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(marked(value));
  }
}

@NgModule({
  declarations: [MarkdownPipe],
  exports: [MarkdownPipe],
  imports: [CommonModule],
})
export class MarkdownPipeModule {}
