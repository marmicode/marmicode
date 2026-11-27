import { inputBinding, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { Accordion } from './accordion.ng';

describe(Accordion.name, () => {
  it.todo('accordion opens one item', async () => {
    const { clickTitle, getItems } = await mountAccordion([
      { title: 'Is it online?', content: 'Yes, on Zoom.' },
      { title: 'Can I get a refund?', content: 'Up to a week before.' },
    ]);

    await clickTitle('Can I get a refund?');

    await expect
      .poll(() => getItems())
      .toEqual([
        { title: 'Is it online?', content: 'Yes, on Zoom.', open: false },
        {
          title: 'Can I get a refund?',
          content: 'Up to a week before.',
          open: true,
        },
      ]);
  });
});

async function mountAccordion(
  items: Array<{ title: string; content: string }>,
) {
  const fixture = TestBed.createComponent(Accordion, {
    bindings: [inputBinding('items', signal(items))],
  });
  await fixture.whenStable();

  const getDetailsElements = () =>
    Array.from(document.querySelectorAll('details'));

  return {
    clickTitle: async (title: string) => {
      getDetailsElements()
        .map((details) => details.querySelector('summary'))
        .find((summary) => summary?.textContent?.trim() === title)
        ?.click();
      await fixture.whenStable();
    },
    /* Native `<details>` only shows its content when open. */
    getItems: () =>
      getDetailsElements().map((details) => {
        const summary = details.querySelector('summary');
        return {
          title: summary?.textContent?.trim(),
          content: details.textContent
            ?.replace(summary?.textContent ?? '', '')
            .trim(),
          open: details.open,
        };
      }),
  };
}
