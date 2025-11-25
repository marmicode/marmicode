import { describe, expect, it } from 'vitest';
import { WorkshopRepository } from './workshop-repository';
import { TestBed } from '@angular/core/testing';

describe(WorkshopRepository.name, () => {
  it('applies absolute picture URI', () => {
    const workshopRepository = TestBed.inject(WorkshopRepository);
    const workshop = workshopRepository.findWorkshop(
      'pragmatic-angular-testing-full-course',
    );
    expect(workshop?.pictureUri).toBe(
      'http://localhost:3000/workshop/infra/workshops/pragmatic-angular-testing.webp',
    );
  });
});
