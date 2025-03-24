import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { OmitPrivate } from '@marmicode/shared-utils';

export class MetaFake implements OmitPrivate<Meta> {
  private _document = inject(DOCUMENT);
  private _metas: Array<{
    definition: MetaDefinition;
    element: HTMLMetaElement;
  }> = [];

  addTags(tags: MetaDefinition[]): HTMLMetaElement[] {
    const newMetas = tags.map((definition) => {
      const element = this._document.createElement('meta');

      for (const key of ['name', 'content', 'title'] as const) {
        if (definition[key]) {
          element[key] = definition[key];
        }
      }

      if (definition.property) {
        element.setAttribute('property', definition.property);
      }

      return { definition, element };
    });
    this._metas = [...this._metas, ...newMetas];
    return newMetas.map((meta) => meta.element);
  }

  addTag(): HTMLMetaElement | null {
    throw new Error('`MetaFake#addTag` not implemented.');
  }

  getTag(): HTMLMetaElement | null {
    throw new Error('`MetaFake#getTag` not implemented.');
  }

  getTags(attrSelector?: string): HTMLMetaElement[] {
    if (attrSelector != null) {
      throw new Error(
        '`MetaFake#getTags` with `attrSelector` not implemented.',
      );
    }

    return this._metas.map((meta) => meta.element);
  }

  removeTag(attrSelector: string): void {
    const [attrName, attrValueRaw] = attrSelector.split('=');
    /* Trim double quotes. */
    const attrValue = attrValueRaw.substring(1, attrValueRaw.length - 1);

    this._metas = this._metas.filter(({ element }) => {
      if (attrName === 'name') {
        return element.name !== attrValue;
      }

      return element.getAttribute(attrName) !== attrValue;
    });
  }

  removeTagElement(): void {
    throw new Error('`MetaFake#removeTagElement` not implemented.');
  }

  updateTag(): HTMLMetaElement | null {
    throw new Error('`MetaFake#updateTag` not implemented.');
  }
}

export function provideMetaFake() {
  return [MetaFake, { provide: Meta, useExisting: MetaFake }];
}
