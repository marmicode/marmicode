import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { CopyLinkButton } from './copy-link-button.component';

describe(CopyLinkButton.name, () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'clipboard');
  });

  it('copies the page URL without query or hash', async () => {
    const { click, clipboard, getButtonText, getCopyCount } =
      await mountCopyLinkButton({ url: '/blog/some-post?utm_source=x#why' });

    await click();

    expect(clipboard.text).toBe(`${location.origin}/blog/some-post`);
    expect(getButtonText()).toBe('Copied');
    expect(getCopyCount()).toBe(1);
  });

  it('denied clipboard', async () => {
    const { click, getButtonText, getCopyCount } = await mountCopyLinkButton({
      url: '/blog/some-post',
      clipboard: new ClipboardFake({ denied: true }),
    });

    await click();

    expect(getButtonText()).toBe('Copy link');
    expect(getCopyCount()).toBe(0);
  });
});

class ClipboardFake {
  text?: string;
  private _denied: boolean;

  constructor({ denied = false }: { denied?: boolean } = {}) {
    this._denied = denied;
  }

  async writeText(text: string) {
    if (this._denied) {
      throw new DOMException('Write permission denied.', 'NotAllowedError');
    }
    this.text = text;
  }
}

async function mountCopyLinkButton({
  url,
  clipboard = new ClipboardFake(),
}: {
  url: string;
  clipboard?: ClipboardFake;
}) {
  history.replaceState(null, '', url);
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: clipboard,
  });

  @Component({
    imports: [CopyLinkButton],
    template: `<mc-copy-link-button
      (linkCopied)="copyCount = copyCount + 1"
    />`,
  })
  class TestHost {
    copyCount = 0;
  }

  const fixture = TestBed.createComponent(TestHost);
  await fixture.whenStable();
  const element: HTMLElement = fixture.nativeElement;

  return {
    clipboard,
    async click() {
      element.querySelector('button')!.click();
      await fixture.whenStable();
    },
    getButtonText() {
      return element.querySelector('button')?.textContent?.trim();
    },
    getCopyCount() {
      return fixture.componentInstance.copyCount;
    },
  };
}
