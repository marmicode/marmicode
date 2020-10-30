import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';
import { Renderer } from 'marked';
import { HighlightZone } from '../highlight/highlight-zone';
import { HighlightLinkComponent } from '../highlight/highlight-link.component';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(
    value: string,
    { highlightableZones }: { highlightableZones: HighlightZone[] }
  ): SafeHtml {
    const renderer = new Renderer();
    const renderLink = renderer.link.bind(renderer);

    renderer.link = (href, title, text) => {
      const html = renderLink(href, title, text);

      /* Using <mc-text-block-link> if it's a special link. */
      if (HighlightLinkComponent.canHandleLink(href)) {
        const attrs = HighlightLinkComponent.buildAttributes({
          href,
          highlightableZones,
        });
        return html.replace(/^<a /, `<mc-text-block-link ${attrs} `);
      }

      /* Otherwise, just use a basic link and open it in new window. */
      return html.replace(/^<a /, '<a target="_blank" ');
    };

    return this._sanitizer.bypassSecurityTrustHtml(
      marked(value, {
        renderer,
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
