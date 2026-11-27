import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideSiteConfig } from '@marmicode/shared/core';
import { externalLinks } from '@marmicode/shared/router-helpers';
import { describe, expect, it } from 'vitest';
import { CoachingLandingPage } from './coaching-landing-page.ng';

describe(CoachingLandingPage.name, () => {
  it('benefits split into headline and detail', async () => {
    const { getBenefits } = await mountCoachingLandingPage();

    const benefits = getBenefits();
    expect(benefits).toHaveLength(3);
    expect(benefits[0].headline).toBe('Deep-dive session');
    expect(benefits[0].detail).toMatch(/^4 hours/);
  });

  it('book a fit call', async () => {
    const { getLinks } = await mountCoachingLandingPage();

    const bookCallLink = {
      href: externalLinks.scheduleCallUrl,
      target: '_blank',
    };
    expect(getLinks('Book a fit call')).toEqual([bookCallLink, bookCallLink]);
  });
});

async function mountCoachingLandingPage() {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
    ],
  });

  const fixture = TestBed.createComponent(CoachingLandingPage);
  await fixture.whenStable();

  const host: HTMLElement = fixture.nativeElement;

  return {
    /* Each benefit tile has its headline as a heading and the rest as its detail. */
    getBenefits() {
      return Array.from(host.querySelectorAll('#benefits li'), (benefit) => ({
        headline: getTextContent(benefit.querySelector('h3')),
        detail: getTextContent(benefit.querySelector('p')),
      }));
    },
    getLinks(text: string) {
      return Array.from(host.querySelectorAll<HTMLAnchorElement>('a'))
        .filter((anchor) => getTextContent(anchor).includes(text))
        .map((anchor) => ({
          href: anchor.getAttribute('href'),
          target: anchor.getAttribute('target'),
        }));
    },
  };
}

function getTextContent(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}
