import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ContentfulClient } from '@marmicode/contentful/infra';
import { provideSiteConfig } from '@marmicode/shared/core';
import { provideApolloCacheWithResolvers } from '@marmicode/shared/testing';
import {
  LocalStorageFake,
  provideLocalStorageFake,
} from '@marmicode/shared/utils/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { describe, expect, it } from 'vitest';
import { BlogPostDetailPageComponent } from './blog-post-detail-page.component';
import { BlogPostRepository } from './blog-post-repository.service';

describe(BlogPostDetailPageComponent.name, () => {
  it.todo('keep cooking excludes the current post', async () => {
    const { getKeepCookingTitles } = await mountBlogPostDetailPage({
      slug: CURRENT_POST.slug,
      resources: [
        NOV_2024_ARTICLE,
        CURRENT_POST,
        OCT_2022_VIDEO,
        MAR_2019_ARTICLE,
      ],
    });

    expect(getKeepCookingTitles()).toHaveLength(3);
    expect(getKeepCookingTitles()).not.toContain(CURRENT_POST.title);
  });
});

const NOV_2024_ARTICLE = aContentfulResource({
  title:
    'The Missing Ingredient for Angular Template Code Coverage and Future-Proof Testing',
  slug: 'angular-template-code-coverage-and-future-proof-testing',
  releasedAt: '2024-11-12T00:00:00.000Z',
  resourceType: 'blog-post',
  skillSlugs: ['angular-aot-testing'],
});

const CURRENT_POST = aContentfulResource({
  title: 'Managing RxJS Traffic with Signals and Suspensify',
  slug: 'managing-rxjs-traffic-with-signals-and-suspensify',
  releasedAt: '2023-04-20T00:00:00.000Z',
  resourceType: 'blog-post',
  skillSlugs: ['angular-signals'],
});

const OCT_2022_VIDEO = aContentfulResource({
  title: 'Cypress Component Testing — The Disappearance of Mr. Button',
  slug: 'cypress-component-testing-the-disappearance-of-mr-button',
  releasedAt: '2022-10-06T00:00:00.000Z',
  resourceType: 'external-video',
  url: 'https://www.youtube.com/watch?v=mr-button',
  skillSlugs: ['angular-cypress-component-testing'],
});

const MAR_2019_ARTICLE = aContentfulResource({
  title: 'Your Angular Module is a SCAM!',
  slug: 'your-angular-module-is-a-scam',
  releasedAt: '2019-03-11T00:00:00.000Z',
  resourceType: 'blog-post',
  skillSlugs: [],
});

type ContentfulResource = ReturnType<typeof aContentfulResource>;

function aContentfulResource({
  title,
  slug,
  releasedAt,
  resourceType,
  url = null,
  skillSlugs,
}: {
  title: string;
  slug: string;
  releasedAt: string;
  resourceType: string;
  url?: string | null;
  skillSlugs: string[];
}) {
  return {
    sys: { id: slug },
    author: {
      name: 'Younes Jaaidi',
      picture: { url: 'https://picture.url/younes' },
      twitter: 'yjaaidi',
    },
    content: { __typename: 'BlogPost', text: 'Life is too short.' },
    duration: 6,
    picture: null,
    releasedAt,
    requiredSkillCollection: { items: [] },
    resourceType,
    skillCollection: { items: skillSlugs.map((slug) => ({ slug })) },
    slug,
    summary: `${title}, in a few words.`,
    title,
    url,
  };
}

async function mountBlogPostDetailPage({
  slug,
  resources,
}: {
  slug: string;
  resources: ContentfulResource[];
}) {
  TestBed.configureTestingModule({
    imports: [ApolloTestingModule],
    providers: [
      provideRouter([
        { path: 'blog/:blogPostSlug', component: BlogPostDetailPageComponent },
      ]),
      provideSiteConfig({ origin: 'https://marmicode.io' }),
      provideLocalStorageFake(),
      BlogPostRepository,
      ContentfulClient,
      provideApolloCacheWithResolvers({
        resourceCollection(_, { args }) {
          /* A slug lookup is the blog post itself, anything else lists the newest resources. */
          const where = args?.['where'] as { slug?: string } | undefined;
          if (where?.slug != null) {
            return {
              items: resources.filter(
                (resource) => resource.slug === where.slug,
              ),
            };
          }
          return {
            items: [...resources]
              .sort((a, b) => b.releasedAt.localeCompare(a.releasedAt))
              .slice(0, args?.['limit'] as number),
          };
        },
      }),
    ],
  });

  TestBed.inject(LocalStorageFake).setItem('wip', 'true');

  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(`/blog/${slug}`);
  await harness.fixture.whenStable();

  const element: HTMLElement = harness.routeNativeElement!;

  return {
    getKeepCookingTitles() {
      return Array.from(element.querySelectorAll('mc-resource-row h3')).map(
        (title) => title.textContent?.trim(),
      );
    },
  };
}
