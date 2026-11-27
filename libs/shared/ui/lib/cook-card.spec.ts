import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { CookCard } from './cook-card.ng';

describe(CookCard.name, () => {
  it('cook card shows the bio', async () => {
    const { getText } = await mountCookCard();

    expect(getText()).toContain('Software Cook');
    expect(getText()).toContain('Google Developer Expert');
  });
});

async function mountCookCard() {
  const fixture = TestBed.createComponent(CookCard);
  await fixture.whenStable();

  const element: HTMLElement = fixture.nativeElement;

  return {
    getText: () => element.textContent?.replace(/\s+/g, ' ') ?? '',
  };
}
