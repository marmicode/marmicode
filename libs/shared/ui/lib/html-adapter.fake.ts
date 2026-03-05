import { Injectable } from '@angular/core';
import { Public } from '@marmicode/shared/utils';
import { HtmlAdapter, LinkTag } from './html-adapter';

@Injectable()
export class HtmlAdapterFake implements Public<HtmlAdapter> {
  private _attributes: Map<string, string> = new Map();
  private _linkTags: LinkTag[] = [];

  addLinkTag(linkTag: LinkTag) {
    this._linkTags = [...this._linkTags, linkTag];
    return {
      remove: () => {
        this._linkTags = this._linkTags.filter((e) => e !== linkTag);
      },
    };
  }

  setHtmlAttribute(attr: string, value: string) {
    this._attributes.set(attr, value);
  }

  getLinkTags(): LinkTag[] {
    return this._linkTags;
  }

  getHtmlAttribute(attr: string): string | undefined {
    return this._attributes.get(attr);
  }
}

export function provideHtmlAdapterFake() {
  return [
    HtmlAdapterFake,
    { provide: HtmlAdapter, useExisting: HtmlAdapterFake },
  ];
}
