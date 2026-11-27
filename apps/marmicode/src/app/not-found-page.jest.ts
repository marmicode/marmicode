import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { describe, expect, it } from '@jest/globals';
import { provideSiteConfig } from '@marmicode/shared/core';
import { NotFoundPage } from './not-found-page.ng';

describe(NotFoundPage.name, () => {
  it('not found links back to the sections', async () => {
    const { getHeading, getLinkHref, hasImage } = await mountNotFoundPage();

    expect(getHeading()).toBe('Oups! The page pot is empty.');
    expect(getLinkHref('Library')).toBe('/library');
    expect(getLinkHref('Training')).toBe('/trainings');
    expect(getLinkHref('Coaching')).toBe('/coaching');
    expect(getLinkHref('Back to the kitchen')).toBe('/');
    expect(hasImage()).toBe(false);
  });
});

async function mountNotFoundPage() {
  TestBed.configureTestingModule({
    providers: [
      provideLocationMocks(),
      provideRouter([{ path: '**', component: NotFoundPage }]),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
    ],
  });

  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl('/this-page-does-not-exist');

  const host: HTMLElement = harness.routeNativeElement!;

  return {
    getHeading() {
      return getTextContent(host.querySelector('h1'));
    },
    /* The href of the link whose text starts with the given name. */
    getLinkHref(name: string) {
      return Array.from(host.querySelectorAll('a'))
        .find((anchor) => getTextContent(anchor)?.startsWith(name))
        ?.getAttribute('href');
    },
    hasImage() {
      return host.querySelector('img') != null;
    },
  };
}

function getTextContent(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, ' ').trim();
}
