import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CodeBlock, createCodeBlock } from '@marmicode/block/core';
import { afterEach, describe, expect, it } from 'vitest';
import { CodeBlockComponent } from './code-block.component';

describe(CodeBlockComponent.name, () => {
  afterEach(() => {
    uninstallClipboardFake();
  });

  it.todo('copy button copies the code', async () => {
    const clipboard = installClipboardFake();
    const { clickCopy, getCopyButton } = await mountCodeBlock(
      createCodeBlock({
        code: `export const answer = 42;`,
        language: 'typescript',
      }),
    );

    await clickCopy();

    expect(await clipboard.readText()).toBe('export const answer = 42;');
    expect(getCopyButton()?.textContent?.trim()).toBe('Copied');
  });
});

/**
 * In-memory stand-in for the Clipboard API, which jsdom doesn't implement.
 */
class ClipboardFake implements Pick<Clipboard, 'readText' | 'writeText'> {
  private _text = '';

  async readText() {
    return this._text;
  }

  async writeText(text: string) {
    this._text = text;
  }
}

function installClipboardFake() {
  const clipboard = new ClipboardFake();
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: clipboard,
  });
  return clipboard;
}

function uninstallClipboardFake() {
  delete (navigator as { clipboard?: Clipboard }).clipboard;
}

async function mountCodeBlock(block: CodeBlock) {
  @Component({
    imports: [CodeBlockComponent],
    template: `<mc-code-block [block]="block()" />`,
  })
  class TestHost {
    block = signal(block);
  }

  const fixture = TestBed.createComponent(TestHost);
  await fixture.whenStable();

  const element: HTMLElement = fixture.nativeElement;

  function getCopyButton() {
    return Array.from(element.querySelectorAll('button')).find((button) =>
      /^Cop(y|ied)$/.test(button.textContent?.trim() ?? ''),
    );
  }

  return {
    async clickCopy() {
      getCopyButton()?.click();
      await fixture.whenStable();
    },
    getCopyButton,
  };
}
