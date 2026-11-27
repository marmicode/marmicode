import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideSiteConfig } from '@marmicode/shared/core';
import { TODAY } from '@marmicode/shared/utils';
import { WorkshopRepository } from '@marmicode/workshop/infra';
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

  it('shows the other-language sessions', async () => {
    const { getSessionRows } = await mountWorkshopPage({
      workshopId: 'pragmatic-angular-testing',
    });

    const frenchRows = getSessionRows().filter((row) => row.lang === 'fr');

    expect(frenchRows).toEqual([
      expect.objectContaining({
        text: expect.stringContaining('janvier 2027'),
        href: '/workshops/test-angular-pragmatique',
      }),
    ]);
  });

  it('no upcoming session', async () => {
    const { getGlanceFacts, getSessionListLinks, getSessionListText } =
      await mountWorkshopPage({ workshopId: 'pragmatic-react-testing' });

    expect(getSessionListText()).toContain('No session scheduled yet.');
    expect(getSessionListLinks()).toContain(
      'https://forms.gle/BFw4AUrzp3LkRLvHA',
    );
    expect(getGlanceFacts()).not.toHaveProperty('Next session');
  });

  it('hero and at a glance', async () => {
    const { getBreadcrumbLinks, getGlanceFacts, getHeroText } =
      await mountWorkshopPage({ workshopId: 'pragmatic-angular-testing' });

    expect(getBreadcrumbLinks()).toEqual([
      { text: 'Training', href: '/workshops' },
    ]);
    expect(getHeroText()).toContain('€1,270');
    expect(getGlanceFacts()['Next session']).toMatch(/Jan 12\s?–\s?14, 2027/);
  });

  it.todo('program shows 8 items, then the rest', async () => {
    const { getProgramToggle, getVisibleProgramSteps, openFullProgram } =
      await mountWorkshopPage({ workshopId: 'pragmatic-angular-testing' });
    const { sections } = TestBed.inject(WorkshopRepository).findWorkshop(
      'pragmatic-angular-testing',
    )!.agenda;

    expect(getVisibleProgramSteps()).toHaveLength(8);
    expect(getProgramToggle()).toContain('Show the full program');

    await openFullProgram();

    expect(getVisibleProgramSteps()).toHaveLength(sections.length);
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
    getBreadcrumbLinks() {
      return Array.from(
        host.querySelectorAll<HTMLAnchorElement>(
          'nav[aria-label="Breadcrumb"] a',
        ),
      ).map((anchor) => ({
        text: getTextContent(anchor),
        href: anchor.getAttribute('href'),
      }));
    },
    getHeroText() {
      return getTextContent(host.querySelector('mc-training-page-hero'));
    },
    /* "At a glance" facts, e.g. { 'Duration': '3 days' }. */
    getGlanceFacts() {
      return Object.fromEntries(
        Array.from(host.querySelectorAll('dl > div')).map((fact) => [
          getTextContent(fact.querySelector('dt')),
          getTextContent(fact.querySelector('dd')),
        ]),
      );
    },
    getProgramToggle() {
      return getTextContent(host.querySelector('mc-workshop-program summary'));
    },
    /* Timeline steps that are not folded in the closed "full program" toggle. */
    getVisibleProgramSteps() {
      return Array.from(host.querySelectorAll('mc-workshop-program li'))
        .filter((item) => item.querySelector(':scope > h3'))
        .filter((step) => !step.closest('details:not([open])'))
        .map((step) => getTextContent(step.querySelector('h3')));
    },
    async openFullProgram() {
      host.querySelector<HTMLElement>('mc-workshop-program summary')?.click();
      await fixture.whenStable();
    },
    getSessionListLinks() {
      return Array.from(
        host.querySelectorAll<HTMLAnchorElement>('mc-workshop-session-list a'),
      ).map((anchor) => anchor.getAttribute('href'));
    },
    getSessionListText() {
      return getTextContent(host.querySelector('mc-workshop-session-list'));
    },
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
