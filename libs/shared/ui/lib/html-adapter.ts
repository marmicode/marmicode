import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HtmlAdapter {
  private _document = inject(DOCUMENT);

  addLinkTag(linkTag: LinkTag) {
    const el = this._document.createElement('link');
    el.rel = linkTag.rel;
    el.href = linkTag.href;
    this._document.head.appendChild(el);
    return {
      remove: () => this._document.head.removeChild(el),
    };
  }

  setHtmlAttribute(attr: string, value: string) {
    this._document.documentElement.setAttribute(attr, value);
  }
}

export type LinkTag =
  | {
      rel: 'canonical';
      href: string;
    }
  | {
      rel: 'alternate';
      hreflang: string;
      href: string;
    };
