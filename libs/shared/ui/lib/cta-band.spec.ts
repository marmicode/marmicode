import { Component, inputBinding, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { CtaBand } from './cta-band.ng';
import { Link } from './link.component';

describe(CtaBand.name, () => {
  it('cta band links internally and externally', async () => {
    const { getLink, setLink } = await mountCtaBand({ route: ['/x'] });

    await expect
      .poll(() => getLink())
      .toEqual({
        text: 'Get in touch',
        href: '/x',
        target: null,
        rel: null,
      });

    setLink({ href: 'https://example.com/contact' });

    await expect
      .poll(() => getLink())
      .toEqual({
        text: 'Get in touch',
        href: 'https://example.com/contact',
        target: '_blank',
        rel: 'noopener',
      });
  });

  it('cta band shows its projected action when it has no link', async () => {
    @Component({
      imports: [CtaBand],
      template: `
        <mc-cta-band heading="Fresh recipes in your inbox.">
          <form ctaAction aria-label="Subscribe"></form>
        </mc-cta-band>
      `,
    })
    class CtaBandHost {}

    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(CtaBandHost);
    await fixture.whenStable();

    expect(document.querySelector('form')?.getAttribute('aria-label')).toBe(
      'Subscribe',
    );
    expect(document.querySelector('a')).toBeNull();
  });
});

async function mountCtaBand(initialLink: Link) {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });

  const link = signal(initialLink);
  const fixture = TestBed.createComponent(CtaBand, {
    bindings: [
      inputBinding('heading', signal('Want this for your team?')),
      inputBinding('link', link),
      inputBinding('linkLabel', signal('Get in touch')),
    ],
  });
  await fixture.whenStable();

  return {
    setLink: (value: Link) => link.set(value),
    getLink: () => {
      const anchor = document.querySelector('a');
      return {
        text: anchor?.textContent?.trim(),
        href: anchor?.getAttribute('href'),
        target: anchor?.getAttribute('target'),
        rel: anchor?.getAttribute('rel'),
      };
    },
  };
}
