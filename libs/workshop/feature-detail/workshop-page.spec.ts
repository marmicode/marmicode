import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideSiteConfig } from '@marmicode/shared/core';
import { TODAY } from '@marmicode/shared/utils';
import { describe, expect, it } from 'vitest';
import { WorkshopPage } from './workshop-page.ng';

describe(WorkshopPage.name, () => {
  it('lists upcoming sessions with Luma links', async () => {
    const { getSessionRows } = await mountWorkshopPage({
      workshopId: 'pragmatic-angular-testing',
    });

    const [row] = getSessionRows();

    /* `Intl` puts thin spaces around the range dash. */
    expect(row?.text).toMatch(/Jan 12\s?–\s?14, 2027/);
    expect(row?.text).toContain('9:30–18:00 CET');
    expect(row?.text).toContain('Book a seat');
    expect(row?.href).toBe('https://luma.com/73n2dvji');
    expect(row?.target).toBe('_blank');
  });

  it.todo('shows the other-language sessions', () => {
    // Same page.
    // Assert a row with `lang="fr"` mentions janvier 2027 and links to `/workshops/test-angular-pragmatique`.
  });

  it.todo('no upcoming session', () => {
    // Mount with `workshopId="pragmatic-react-testing"`.
    // Assert "No session scheduled yet." and the custom session link.
    // Assert the "at a glance" card has no "Next session" entry.
  });

  it.todo('hero and at a glance', () => {
    // Assert the breadcrumb links to `/workshops`, the price "€1,270", and the at-a-glance next session "Jan 12–14, 2027".
  });

  it.todo('program shows 8 items, then the rest', () => {
    // Assert 8 visible timeline items and a "Show the full program" toggle; open it and assert every agenda item is listed.
  });

  it.todo('french workshop in French', () => {
    // Mount with `workshopId="test-angular-pragmatique"`.
    // Assert "Réserver une place", French session dates, and the OPCO note.
  });
});

async function mountWorkshopPage({
  workshopId,
  today = '2026-11-27',
}: {
  workshopId: string;
  today?: string;
}) {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
      { provide: TODAY, useValue: () => new Date(today) },
    ],
  });

  const fixture = TestBed.createComponent(WorkshopPage);
  fixture.componentRef.setInput('workshopId', workshopId);
  await fixture.whenStable();

  const host: HTMLElement = fixture.nativeElement;

  return {
    /* Each session row is a link with a heading. */
    getSessionRows() {
      return Array.from(
        host.querySelectorAll<HTMLAnchorElement>('mc-workshop-session-list a'),
      )
        .filter((anchor) => anchor.querySelector('h3'))
        .map((anchor) => ({
          text: getTextContent(anchor),
          href: anchor.getAttribute('href'),
          target: anchor.getAttribute('target'),
          lang: anchor.getAttribute('lang'),
        }));
    },
  };
}

function getTextContent(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, ' ').trim();
}
