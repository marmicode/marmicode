import { inputBinding, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Testimonial } from '@marmicode/training/core';
import { describe, expect, it } from 'vitest';
import { TrainingQuoteGrid } from './training-quote-grid.ng';

describe(TrainingQuoteGrid.name, () => {
  it.todo('quotes fall back to initials', async () => {
    const { getPictures, getDecorativeTexts } = await mountTrainingQuoteGrid([
      {
        quote: 'My tests finally survive refactors.',
        authorName: 'Ada Lovelace',
        authorPictureUri: '/ada.webp',
        authorRole: 'Tech Lead',
        authorCompany: 'Analytical Engines',
      },
      {
        quote: 'Pragmatic and fun.',
        authorName: 'Grace Hopper',
      },
    ]);

    expect(getPictures()).toEqual([{ src: '/ada.webp', alt: 'Ada Lovelace' }]);
    expect(getDecorativeTexts()).toEqual(['GH']);
  });
});

async function mountTrainingQuoteGrid(testimonials: Testimonial[]) {
  const fixture = TestBed.createComponent(TrainingQuoteGrid, {
    bindings: [inputBinding('testimonials', signal(testimonials))],
  });
  await fixture.whenStable();

  const element: HTMLElement = fixture.nativeElement;

  return {
    getPictures: () =>
      Array.from(element.querySelectorAll('img')).map((img) => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
      })),
    /* The initials avatar is hidden from screen readers: the name is right next to it. */
    getDecorativeTexts: () =>
      Array.from(element.querySelectorAll('[aria-hidden="true"]')).map(
        (decorative) => decorative.textContent?.trim(),
      ),
  };
}
