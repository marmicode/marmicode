import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { TrainingPageHero } from './training-page-hero.ng';
import { trainingMother } from './training.mother';

describe(TrainingPageHero.name, () => {
  it('hero renders the breadcrumb and projected content', async () => {
    const { getHeading, getBreadcrumbLinks, getAsideText } =
      await mountTrainingPageHero();

    expect(getHeading()).toBe('Pragmatic Angular Testing');
    expect(getBreadcrumbLinks()).toEqual([
      { text: 'Training', href: '/trainings' },
    ]);
    expect(getAsideText()).toBe('€1,270 per seat');
  });
});

async function mountTrainingPageHero() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });

  @Component({
    imports: [TrainingPageHero],
    template: `
      <mc-training-page-hero [breadcrumb]="breadcrumb" [training]="training">
        <p slot="aside" data-testid="aside">€1,270 per seat</p>
      </mc-training-page-hero>
    `,
  })
  class TrainingPageHeroHost {
    training = trainingMother
      .withBasicInfo('Pragmatic Angular Testing')
      .build();
    breadcrumb = [
      { label: 'Training', link: { route: ['/trainings'] } },
      { label: 'Workshops' },
    ];
  }

  const fixture = TestBed.createComponent(TrainingPageHeroHost);
  await fixture.whenStable();

  const breadcrumb = () =>
    document.querySelector<HTMLElement>('nav[aria-label="Breadcrumb"]');

  return {
    getHeading: () =>
      document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
    getBreadcrumbLinks: () =>
      Array.from(breadcrumb()?.querySelectorAll('a') ?? []).map((link) => ({
        text: link.textContent?.trim(),
        href: link.getAttribute('href'),
      })),
    getAsideText: () =>
      document.querySelector('[data-testid="aside"]')?.textContent?.trim(),
  };
}
