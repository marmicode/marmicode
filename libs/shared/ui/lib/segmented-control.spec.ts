import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import {
  SegmentedControl,
  SegmentedControlOption,
} from './segmented-control.ng';

describe(SegmentedControl.name, () => {
  it('segmented control selects one option', async () => {
    const { click, getButtons, getValue } = await mountSegmentedControl({
      options: [
        { value: null, label: 'All' },
        { value: 'cohort', label: 'Cohort' },
        { value: 'workshop', label: 'Workshops' },
      ],
      value: null,
    });

    await click('Cohort');

    expect(getValue()).toBe('cohort');
    await expect
      .poll(() => getButtons())
      .toEqual([
        { name: 'All', pressed: 'false' },
        { name: 'Cohort', pressed: 'true' },
        { name: 'Workshops', pressed: 'false' },
      ]);
  });

  it.todo('segmented control hides emojis from screen readers', async () => {
    const { getButtons, getButtonTexts } = await mountSegmentedControl({
      options: [{ value: 'cohort', label: 'Cohort', emoji: '👥' }],
      value: 'cohort',
    });

    /* The emoji is shown... */
    expect(getButtonTexts()).toEqual(['👥 Cohort']);
    /* ...but not announced. */
    expect(getButtons()).toEqual([{ name: 'Cohort', pressed: 'true' }]);
  });
});

async function mountSegmentedControl<T>({
  options,
  value,
}: {
  options: SegmentedControlOption<T>[];
  value: T;
}) {
  @Component({
    imports: [SegmentedControl],
    template: `<mc-segmented-control
      ariaLabel="Filter by format"
      [options]="options"
      [(value)]="value"
    />`,
  })
  class SegmentedControlHost {
    options = options;
    value = signal(value);
  }

  const fixture = TestBed.createComponent(SegmentedControlHost);
  await fixture.whenStable();

  const getButtonElements = () =>
    Array.from(document.querySelectorAll<HTMLButtonElement>('button'));

  return {
    getValue: () => fixture.componentInstance.value(),
    getButtonTexts: () =>
      getButtonElements().map((button) =>
        button.textContent?.replace(/\s+/g, ' ').trim(),
      ),
    getButtons: () =>
      getButtonElements().map((button) => ({
        name: getAccessibleName(button),
        pressed: button.getAttribute('aria-pressed'),
      })),
    click: async (name: string) => {
      getButtonElements()
        .find((button) => getAccessibleName(button) === name)
        ?.click();
      await fixture.whenStable();
    },
  };
}

/* Good enough for buttons: the text without the parts hidden from screen readers. */
function getAccessibleName(element: HTMLElement) {
  const clone = element.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll('[aria-hidden="true"]')
    .forEach((hidden) => hidden.remove());
  return clone.textContent?.trim();
}
