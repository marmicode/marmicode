import { provideLocationMocks } from '@angular/common/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it } from '@jest/globals';
import { externalLinks } from '@marmicode/shared/router-helpers';
import {
  LocalStorageFake,
  provideLocalStorageFake,
} from '@marmicode/shared/utils/testing';
import { AppComponent } from './app.component';

/* Jest's `it.todo` does not accept a body, so WIP tests use `it.skip`. */
describe(AppComponent.name, () => {
  it('nav links to the three sections and the contact form', async () => {
    const { getNavLink } = await mountApp({ wip: true });

    expect(getNavLink('Library')).toEqual({
      href: '/learn/everything',
      target: null,
    });
    expect(getNavLink('Training')).toEqual({
      href: '/workshops',
      target: null,
    });
    expect(getNavLink('Coaching')).toEqual({
      href: '/coaching',
      target: null,
    });
    expect(getNavLink('Contact me')).toEqual({
      href: externalLinks.contactFormUrl,
      target: '_blank',
    });
  });

  it.skip('nav highlights the current section', async () => {
    const { getCurrentNavLinks, navigate } = await mountApp({ wip: true });

    await navigate('/cohorts/from-drift-to-trust-for-angular');
    expect(getCurrentNavLinks()).toEqual(['Training']);

    await navigate('/blog/some-post');
    expect(getCurrentNavLinks()).toEqual(['Library']);
  });

  it.skip('old shell without WIP mode', () => {
    // Arrange WIP mode off; mount `AppComponent`.
    // Assert the old `mc-nav` and `mc-footer` render, and `mc-site-nav` doesn't.
  });
});

async function mountApp({ wip }: { wip: boolean }) {
  @Component({ template: '' })
  class EmptyPage {}

  TestBed.configureTestingModule({
    providers: [
      provideLocalStorageFake(),
      provideLocationMocks(),
      provideRouter([{ path: '**', component: EmptyPage }]),
    ],
  });

  if (wip) {
    TestBed.inject(LocalStorageFake).setItem('wip', 'true');
  }

  const fixture = TestBed.createComponent(AppComponent);
  await fixture.whenStable();

  const host: HTMLElement = fixture.nativeElement;

  const getNavLinkElements = () =>
    Array.from(host.querySelectorAll<HTMLAnchorElement>('mc-site-nav a'));

  return {
    /* Names of the links marked as the current page. */
    getCurrentNavLinks() {
      return getNavLinkElements()
        .filter((anchor) => anchor.getAttribute('aria-current') === 'page')
        .map((anchor) => getTextContent(anchor));
    },
    getNavLink(name: string) {
      const link = getNavLinkElements().find(
        (anchor) => getTextContent(anchor) === name,
      );

      return link
        ? {
            href: link.getAttribute('href'),
            target: link.getAttribute('target'),
          }
        : undefined;
    },
    async navigate(url: string) {
      await TestBed.inject(Router).navigateByUrl(url);
      await fixture.whenStable();
    },
  };
}

function getTextContent(element: HTMLElement) {
  return element.textContent?.replace(/\s+/g, ' ').trim();
}
