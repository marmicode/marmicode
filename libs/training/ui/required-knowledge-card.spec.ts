import { inputBinding, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TrainingLanguage } from '@marmicode/training/core';
import { describe, expect, it } from 'vitest';
import { RequiredKnowledgeCard } from './required-knowledge-card.ng';

describe(RequiredKnowledgeCard.name, () => {
  it('required knowledge is localized', async () => {
    const { getHeading, getItems } = await mountRequiredKnowledgeCard({
      language: 'fr',
      skills: ['Les bases d’Angular', 'Les bases de TypeScript'],
    });

    expect(getHeading()).toBe('// prérequis');
    expect(getItems()).toEqual([
      'Les bases d’Angular',
      'Les bases de TypeScript',
    ]);
  });
});

async function mountRequiredKnowledgeCard({
  language,
  skills,
}: {
  language: TrainingLanguage;
  skills: string[];
}) {
  const fixture = TestBed.createComponent(RequiredKnowledgeCard, {
    bindings: [
      inputBinding('language', signal(language)),
      inputBinding('skills', signal(skills)),
    ],
  });
  await fixture.whenStable();

  const element: HTMLElement = fixture.nativeElement;

  return {
    getHeading: () => element.querySelector('h3')?.textContent?.trim(),
    getItems: () =>
      Array.from(element.querySelectorAll('li')).map((item) =>
        item.textContent?.trim(),
      ),
  };
}
