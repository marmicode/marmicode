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
      .toBe(
        '/workshop/infra/workshops/pragmatic-angular-testing/pragmatic-angular-testing.webp',
      );
    expect
      .soft(workshop?.thumbnailUri)
      .toBe(
        '/workshop/infra/workshops/pragmatic-angular-testing/pragmatic-angular-testing-thumbnail.webp',
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

  it('only has sessions with valid YYYY-MM-DD dates', () => {
    const invalidSessions = TestBed.inject(WorkshopRepository)
      .getWorkshops()
      .flatMap((workshop) =>
        workshop.sessions.map((session) => ({ workshop, session })),
      )
      .filter(
        ({ session }) =>
          !isValidIsoDate(session.startDate) ||
          (session.endDate != null &&
            (!isValidIsoDate(session.endDate) ||
              session.endDate < session.startDate)),
      )
      .map(({ workshop, session }) => ({
        workshopId: workshop.id,
        startDate: session.startDate,
        endDate: session.endDate,
      }));

    expect(invalidSessions).toEqual([]);
  });
});

/**
 * Checks the format and that the day exists (e.g. rejects `2026-02-30`).
 */
function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}
