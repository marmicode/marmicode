import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { getResourceTopics, ResourceType } from '@marmicode/resource/core';
import { provideSiteConfig } from '@marmicode/shared/core';
import { describe, expect, it } from 'vitest';
import { LibraryPage } from './library-page.ng';
import { Resource } from './resource';
import { ResourceRepository } from './resource-repository.service';
import { ResourceRepositoryFake } from './resource-repository.fake';
import { Skill } from './skill';

describe(LibraryPage.name, () => {
  it.todo('lists resources newest first, one per row', async () => {
    const { getRows } = await mountLibraryPage({
      resources: [APR_2023_ARTICLE, OCT_2022_VIDEO, NOV_2024_ARTICLE],
    });

    expect(getRows().map(({ title }) => title)).toEqual([
      NOV_2024_ARTICLE.title,
      APR_2023_ARTICLE.title,
      OCT_2022_VIDEO.title,
    ]);
    expect(
      getRows().find(({ title }) => title === OCT_2022_VIDEO.title),
    ).toMatchObject({
      playBadge: '40 min',
      action: 'Watch',
    });
  });

  it.todo('rows show topic tags, not skills', () => {
    // Arrange a resource with skills mapping to Testing and Angular.
    // Assert its row shows the tags "Testing" and "Angular", and no "You will learn" text.
  });

  it.todo('filters by kind, topic and search', () => {
    // Click "Videos" and assert only video rows; reset.
    // Click "RxJS" and assert only RxJS rows and the heading "N results"; reset.
    // Type "signals" and assert only matching rows.
  });

  it.todo('empty search shows the empty state', () => {
    // Type "xyz".
    // Assert "That one hasn't been cooked yet."; click **Show everything** and assert all rows are back with empty search and filters.
  });

  it.todo('skill routes still work', () => {
    // Mount on `/learn/angular-signals` with the fake repository.
    // Assert only that skill's resources are listed.
  });

  it.todo('cookbook banner links to the cookbook', () => {
    // Assert a link to `https://cookbook.marmicode.io` with `target="_blank"` sits above the list.
  });
});

const ANGULAR_AOT_TESTING = aSkill({
  label: 'Angular AOT Testing',
  slug: 'angular-aot-testing',
});
const ANGULAR_CYPRESS_COMPONENT_TESTING = aSkill({
  label: 'Angular Cypress Component Testing',
  slug: 'angular-cypress-component-testing',
});
const ANGULAR_SIGNALS = aSkill({
  label: 'Angular Signals',
  slug: 'angular-signals',
});
const RXJS_BASICS = aSkill({ label: 'RxJS Basics', slug: 'rxjs-basics' });

const NOV_2024_ARTICLE = aResource({
  title:
    'The Missing Ingredient for Angular Template Code Coverage and Future-Proof Testing',
  summary:
    'How turning on Ahead-Of-Time compilation for your Angular tests enables accurate template code coverage.',
  type: ResourceType.BlogPost,
  slug: 'angular-template-code-coverage-and-future-proof-testing',
  releasedAt: new Date('2024-11-12'),
  duration: 6,
  skills: [ANGULAR_AOT_TESTING],
});

const APR_2023_ARTICLE = aResource({
  title: 'Managing RxJS Traffic with Signals and Suspensify',
  summary:
    'Handling pending status and errors across RxJS & Signals can quickly get tricky.',
  type: ResourceType.BlogPost,
  slug: 'managing-rxjs-traffic-with-signals-and-suspensify',
  releasedAt: new Date('2023-04-20'),
  duration: 9,
  skills: [ANGULAR_SIGNALS, RXJS_BASICS],
});

const OCT_2022_VIDEO = aResource({
  title: 'Cypress Component Testing — The Disappearance of Mr. Button',
  summary: 'Talk at NG-DE 2022 on testing Angular components with Cypress.',
  type: ResourceType.ExternalVideo,
  slug: 'cypress-component-testing-the-disappearance-of-mr-button',
  url: 'https://www.youtube.com/watch?v=mr-button',
  releasedAt: new Date('2022-10-06'),
  duration: 40,
  skills: [ANGULAR_CYPRESS_COMPONENT_TESTING],
});

const RESOURCES = [NOV_2024_ARTICLE, APR_2023_ARTICLE, OCT_2022_VIDEO];

async function mountLibraryPage({
  url = '/learn/everything',
  resources = RESOURCES,
}: { url?: string; resources?: Resource[] } = {}) {
  TestBed.configureTestingModule({
    providers: [
      provideRouter(
        [{ path: 'learn/:skillSlug', component: LibraryPage }],
        withComponentInputBinding(),
      ),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
      ResourceRepositoryFake,
      { provide: ResourceRepository, useExisting: ResourceRepositoryFake },
    ],
  });

  TestBed.inject(ResourceRepositoryFake).configure({ resources });

  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);

  const host: HTMLElement = harness.routeNativeElement!;

  return {
    /* One row per resource, in display order. */
    getRows: () =>
      Array.from(host.querySelectorAll('mc-resource-row')).map((row) => ({
        title: getTextContent(row.querySelector('h3')),
        playBadge: getTextContent(row.querySelector('.play')),
        action: getTextContent(row.querySelector('.read')),
      })),
  };
}

function aSkill({ label, slug }: { label: string; slug: string }): Skill {
  return { id: slug, label, slug };
}

/* Topics are derived from skills, as `ResourceRepository` does. */
function aResource(
  resource: Pick<
    Resource,
    'title' | 'summary' | 'type' | 'slug' | 'releasedAt' | 'duration' | 'skills'
  > &
    Partial<Resource>,
): Resource {
  const requiredSkills = resource.requiredSkills ?? [];
  return {
    id: resource.slug,
    url: `https://marmicode.io/blog/${resource.slug}`,
    requiredSkills,
    topics: getResourceTopics({
      skillSlugs: [...resource.skills, ...requiredSkills].map(
        ({ slug }) => slug,
      ),
    }),
    ...resource,
  };
}

function getTextContent(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, ' ').trim();
}
