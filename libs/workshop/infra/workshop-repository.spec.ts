import { describe, expect, it } from 'vitest';
import { WorkshopRepository } from './workshop-repository';
import { TestBed } from '@angular/core/testing';

describe(WorkshopRepository.name, () => {
  it('applies absolute picture URI', () => {
    const workshop = TestBed.inject(WorkshopRepository).findWorkshop(
      'pragmatic-angular-testing',
    );

    expect
      .soft(workshop?.pictureUri)
      .toBe('/workshop/infra/workshops/pragmatic-angular-testing.webp');
    expect
      .soft(workshop?.thumbnailUri)
      .toBe(
        '/workshop/infra/workshops/pragmatic-angular-testing-thumbnail.webp',
      );
  });

  it('adds alternate workshops', () => {
    const workshop = TestBed.inject(WorkshopRepository).findWorkshop(
      'pragmatic-angular-testing',
    );

    expect(workshop?.alternates).toEqual([
      {
        id: 'test-angular-pragmatique',
        language: 'fr',
      },
    ]);
  });
});
