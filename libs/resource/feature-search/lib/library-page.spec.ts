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
  it('lists resources newest first, one per row', async () => {
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

  it('rows show topic tags, not skills', async () => {
    /* `angular-aot-testing` maps to Testing and Angular. */
    const { getRows, getText } = await mountLibraryPage({
      resources: [NOV_2024_ARTICLE],
    });

    expect(getRows()[0]?.topicTags).toEqual(['Testing', 'Angular']);
    expect(getText()).not.toMatch(/you will learn/i);
  });

  it('filters by kind, topic and search', async () => {
    const { click, getHeading, getRowTitles, search } =
      await mountLibraryPage();

    await click('Videos');
    expect(getRowTitles()).toEqual([
      OCT_2022_VIDEO.title,
      JUL_2020_VIDEO.title,
    ]);
    await click('All');

    await click('RxJS');
    expect(getRowTitles()).toEqual([
      APR_2023_ARTICLE.title,
      JUL_2020_VIDEO.title,
    ]);
    expect(getHeading()).toBe('2 results');
    await click('All topics');

    await search('signals');
    expect(getRowTitles()).toEqual([APR_2023_ARTICLE.title]);
  });

  it('empty search shows the empty state', async () => {
    const {
      click,
      getPressedFilters,
      getRowTitles,
      getSearch,
      getText,
      search,
    } = await mountLibraryPage();

    await click('Videos');
    await search('xyz');

    expect(getRowTitles()).toEqual([]);
    expect(getText()).toContain("That one hasn't been cooked yet.");

    await click('Show everything');

    expect(getRowTitles()).toEqual(RESOURCES.map(({ title }) => title));
    expect(getSearch()).toBe('');
    expect(getPressedFilters()).toEqual(['All', 'All topics']);
  });

  it.todo('skill routes still work', async () => {
    const { getHeading, getRowTitles } = await mountLibraryPage({
      url: '/learn/angular-signals',
    });

    expect(getRowTitles()).toEqual([APR_2023_ARTICLE.title]);
    /* The heading names the skill instead of "Everything". */
    expect(getHeading()).toBe('Angular Signals');
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
const PROPAGATING_HTTP_REQUEST_CANCELATION = aSkill({
  label: 'Propagating HTTP Request Cancelation',
  slug: 'propagating-http-request-cancelation',
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

const JUL_2020_VIDEO = aResource({
  title: 'What happens when you cancel an HTTP Request?',
  summary:
    'Following a cancelled request all the way from the browser to the backend.',
  type: ResourceType.ExternalVideo,
  slug: 'what-happens-when-you-cancel-an-http-request',
  url: 'https://www.youtube.com/watch?v=cancel-http-request',
  releasedAt: new Date('2020-07-02'),
  duration: 25,
  skills: [PROPAGATING_HTTP_REQUEST_CANCELATION],
});

const RESOURCES = [
  NOV_2024_ARTICLE,
  APR_2023_ARTICLE,
  OCT_2022_VIDEO,
  JUL_2020_VIDEO,
];

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
  /* Resources load in an effect, after the navigation settles. */
  await harness.fixture.whenStable();

  const host: HTMLElement = harness.routeNativeElement!;

  /* One row per resource, in display order. */
  const getRows = () =>
    Array.from(host.querySelectorAll('mc-resource-row')).map((row) => ({
      title: getTextContent(row.querySelector('h3')),
      playBadge: getTextContent(row.querySelector('.play')),
      action: getTextContent(row.querySelector('.read')),
      topicTags: Array.from(row.querySelectorAll('.topic-tag')).map((tag) =>
        getTextContent(tag),
      ),
    }));

  return {
    /* Clicks a filter or a button by its accessible text. */
    async click(name: string) {
      Array.from(host.querySelectorAll('button'))
        .find((button) => getAccessibleText(button) === name)
        ?.click();
      await harness.fixture.whenStable();
    },
    /* The list heading: "Everything", the skill, or the live result count. */
    getHeading: () => getTextContent(host.querySelector('[role="status"]')),
    /* The pressed kind and topic filters. */
    getPressedFilters: () =>
      Array.from(host.querySelectorAll('button[aria-pressed="true"]')).map(
        (button) => getAccessibleText(button),
      ),
    getRows,
    getRowTitles: () => getRows().map(({ title }) => title),
    getSearch: () =>
      host.querySelector<HTMLInputElement>('input[type="search"]')?.value,
    getText: () => getTextContent(host),
    async search(text: string) {
      const input = host.querySelector<HTMLInputElement>(
        'input[type="search"]',
      );
      if (!input) {
        throw new Error('Search input not found');
      }
      input.value = text;
      input.dispatchEvent(new Event('input'));
      await harness.fixture.whenStable();
    },
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

/* Good enough for buttons: the text without the parts hidden from screen readers. */
function getAccessibleText(element: Element | null) {
  const clone = element?.cloneNode(true) as Element | undefined;
  clone
    ?.querySelectorAll('[aria-hidden="true"]')
    .forEach((hidden) => hidden.remove());
  return getTextContent(clone ?? null);
}
