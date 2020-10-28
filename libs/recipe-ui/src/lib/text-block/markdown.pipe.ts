import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';
import { Renderer } from 'marked';
import { TextBlockLinkComponent } from './text-block-link.component';

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

      /* Using <mc-text-block-link> if it's a special link. */
      if (TextBlockLinkComponent.canHandleLink(href)) {
        return html.replace(/^<a /, '<mc-text-block-link ');
      }

      /* Otherwise, just use a basic link and open it in new window. */
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
