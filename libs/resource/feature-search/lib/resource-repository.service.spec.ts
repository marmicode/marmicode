import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContentfulClient } from '@marmicode/contentful/infra';
import { Public } from '@marmicode/shared/utils';
import { provideLocalStorageFake } from '@marmicode/shared/utils/testing';
import { Apollo } from 'apollo-angular';
import { firstValueFrom, Observable, of } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { ResourceRepository } from './resource-repository.service';

describe(ResourceRepository.name, () => {
  it('library skips recipes', async () => {
    const { getResources } = setUp({
      items: [
        createContentfulResource({
          resourceType: 'blog-post',
          slug: 'pragmatic-angular-testing',
        }),
        createContentfulResource({
          resourceType: 'recipe',
          slug: 'angular-testing-recipe',
        }),
      ],
    });

    const resources = await getResources();

    expect(resources.map(({ slug }) => slug)).toEqual([
      'pragmatic-angular-testing',
    ]);
  });

  it('library maps resources without skill collections to no skills', async () => {
    const { getResources } = setUp({
      items: [
        {
          ...createContentfulResource({
            resourceType: 'blog-post',
            slug: 'pragmatic-angular-testing',
          }),
          requiredSkillCollection: null,
          skillCollection: null,
        },
      ],
    });

    const [resource] = await getResources();

    expect.soft(resource).toMatchObject({ requiredSkills: [], skills: [] });
  });
});

function setUp({ items }: { items: unknown[] }) {
  TestBed.configureTestingModule({
    providers: [
      ResourceRepository,
      ContentfulClientFake,
      { provide: ContentfulClient, useExisting: ContentfulClientFake },
      provideLocalStorageFake(),
    ],
  });

  TestBed.inject(ContentfulClientFake).configure({
    data: { resourceCollection: { items } },
  });

  const repository = TestBed.inject(ResourceRepository);

  return {
    getResources() {
      return firstValueFrom(repository.getResources());
    },
  };
}

function createContentfulResource({
  resourceType,
  slug,
}: {
  resourceType: string;
  slug: string;
}) {
  return {
    sys: { id: slug },
    author: null,
    duration: 5,
    isWip: false,
    picture: null,
    releasedAt: '2026-01-01T00:00:00.000Z',
    requiredSkillCollection: { items: [] },
    resourceType,
    skillCollection: { items: [] },
    slug,
    summary: `Summary of ${slug}`,
    title: `Title of ${slug}`,
    url: `https://marmicode.io/${slug}`,
  };
}

/**
 * Answers every query with the configured data.
 */
@Injectable()
class ContentfulClientFake implements Public<ContentfulClient> {
  private _data: unknown;

  configure({ data }: { data: unknown }) {
    this._data = data;
  }

  query<QUERY>(): Observable<Apollo.QueryResult<QUERY>> {
    return of({ data: this._data } as Apollo.QueryResult<QUERY>);
  }
}
