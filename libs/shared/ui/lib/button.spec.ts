import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { Button } from './button.ng';

describe(Button.name, () => {
  it.todo('button renders both variants', async () => {
    const { getLink, getButton } = await mountButtons();

    expect(getLink()).toEqual({ text: 'Book a seat', href: '/x' });
    expect(getButton()).toEqual({ text: 'Request a custom session' });
  });
});

async function mountButtons() {
  @Component({
    imports: [Button],
    template: `
      <a mcButton href="/x">Book a seat</a>
      <button mcButton="ghost">Request a custom session</button>
    `,
  })
  class ButtonsHost {}

  const fixture = TestBed.createComponent(ButtonsHost);
  await fixture.whenStable();

  return {
    getLink: () => {
      const link = document.querySelector('a');
      return {
        text: link?.textContent?.trim(),
        href: link?.getAttribute('href'),
      };
    },
    getButton: () => ({
      text: document.querySelector('button')?.textContent?.trim(),
    }),
  };
}
