import { inputBinding, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { CookCard } from './cook-card.ng';

describe(CookCard.name, () => {
  it.todo('cook card banner keeps the same bio', async () => {
    const banner = await mountCookCard({ appearance: 'banner' });
    const card = await mountCookCard();

    for (const cookCard of [banner, card]) {
      expect(cookCard.getText()).toContain('Software Cook');
      expect(cookCard.getText()).toContain('Google Developer Expert');
    }
  });
});

async function mountCookCard({
  appearance,
}: { appearance?: 'card' | 'banner' } = {}) {
  const fixture = TestBed.createComponent(CookCard, {
    bindings: appearance
      ? [inputBinding('appearance', signal(appearance))]
      : [],
  });
  await fixture.whenStable();

  const element: HTMLElement = fixture.nativeElement;

  return {
    getText: () => element.textContent?.replace(/\s+/g, ' ') ?? '',
  };
}
