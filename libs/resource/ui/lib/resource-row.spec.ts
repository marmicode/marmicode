import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { ResourceRow, ResourceRowData } from './resource-row.ng';

describe(ResourceRow.name, () => {
  it.todo('row falls back to a placeholder thumbnail', async () => {
    const { getThumbnail } = await mountResourceRow({
      ...ARTICLE,
      pictureUri: undefined,
    });

    expect(getThumbnail()?.querySelector('img')).toBeNull();
    expect(
      getThumbnail()?.querySelector(':scope > [aria-hidden="true"]'),
    ).not.toBeNull();
  });
});

const ARTICLE: ResourceRowData = {
  title: 'Your Angular Module is a SCAM!',
  summary:
    'Choosing the right modules architecture is tricky… but wait, do we really need modules?',
  kind: 'article',
  releasedAt: new Date('2019-03-11'),
  duration: 4,
  pictureUri: 'https://images.ctfassets.net/scam.png',
  topicLabels: ['Architecture', 'Angular'],
  link: { route: ['/', 'blog', 'your-angular-module-is-a-scam'] },
};

async function mountResourceRow(resource: ResourceRowData) {
  @Component({
    imports: [ResourceRow],
    template: `<mc-resource-row [resource]="resource()" />`,
  })
  class TestHost {
    resource = signal(resource);
  }

  TestBed.configureTestingModule({ providers: [provideRouter([])] });

  const fixture = TestBed.createComponent(TestHost);
  await fixture.whenStable();

  const host: HTMLElement = fixture.nativeElement;

  return {
    getThumbnail: () => host.querySelector('.thumb'),
  };
}
