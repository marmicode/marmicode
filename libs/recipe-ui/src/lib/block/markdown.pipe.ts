import { CommonModule } from '@angular/common';
import {
  NgModule,
  Pipe,
  PipeTransform
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';
import { Renderer } from 'marked';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  private _renderer: Renderer;

  constructor(private _sanitizer: DomSanitizer) {
    const renderer = new Renderer();
    const renderLink = renderer.link.bind(renderer);
    renderer.link = (href, title, text) => {
      const html = renderLink(href, title, text);
      return html.replace(/^<a /, '<a target="_blank"');
    };
    this._renderer = renderer;
  }

  transform(value: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(
      marked(value, {
        renderer: this._renderer,
      })
    );
  }
}

@NgModule({
  declarations: [MarkdownPipe],
  exports: [MarkdownPipe],
  imports: [CommonModule],
})
export class MarkdownPipeModule {}
