import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HtmlAdapter {
  private _document = inject(DOCUMENT);

  upsertLinkTag(linkTag: LinkTag) {
    const allLinks = Array.from(this._document.head.querySelectorAll('link'));

    /* Find existing link tag to avoid duplicates.
     * This happens due to SSR. */
    let el = allLinks.find(
      (e) =>
        e.rel === linkTag.rel &&
        e.href === linkTag.href &&
        (linkTag.rel === 'alternate' ? e.hreflang === linkTag.hreflang : true),
    );

    if (!el) {
      el = this._document.createElement('link');
      el.rel = linkTag.rel;
      el.href = linkTag.href;

      if (linkTag.rel === 'alternate') {
        el.hreflang = linkTag.hreflang;
      }

      this._document.head.appendChild(el);
    }

    return {
      remove: () => el.remove(),
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
