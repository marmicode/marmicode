import { inject, Injectable, NgModule } from '@angular/core';
import * as contentful from '@marmicode/contentful/infra';
import {
  ContentfulClient,
  provideContentfulClient,
  Query,
} from '@marmicode/contentful/infra';
import { createAuthor } from '@marmicode/resource/core';
import { WipService } from '@marmicode/shared/utils';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { createResource, Resource } from './resource';
import { Skill } from './skill';
import { skillFragment, skillFragmentToSkill } from './skill-fragment';

const resourceFragment = gql`
  ${skillFragment}
  fragment ResourceFragment on Resource {
    sys {
      id
    }
    author {
      name
      picture {
        url
      }
    }
    duration
    isWip
    picture {
      url
    }
    releasedAt
    requiredSkillCollection(limit: 10) {
      items {
        ...SkillFragment
      }
    }
    resourceType
    skillCollection(limit: 10) {
      items {
        ...SkillFragment
      }
    }
    slug
    summary
    title
    url
  }
`;

const getAllResources = gql`
  ${resourceFragment}
  query getAllResources($filter: ResourceFilter) {
    resourceCollection(order: [releasedAt_DESC], where: $filter) {
      items {
        ...ResourceFragment
      }
    }
  }
`;

const getResourcesBySkill = gql`
  ${resourceFragment}
  query getResourcesBySkill($skillSlug: String!) {
    skillCollection(limit: 1, where: { slug: $skillSlug }) {
      items {
        linkedFrom {
          resourceCollection {
            items {
              ...ResourceFragment
            }
          }
        }
      }
    }
  }
`;

@Injectable()
export class ResourceRepository {
  private _contentfulClient = inject(ContentfulClient);
  private _wip = inject(WipService);

  getResources(): Observable<Resource[]> {
    return this._contentfulClient
      .query<Query>({
        query: getAllResources,
        variables: {
          /* Hide wip resources except if we are in wip mode. */
          filter: this._wip.isWip() ? {} : { isWip_not: true },
        },
      })
      .pipe(
        map(({ data }) => {
          if (!data?.resourceCollection) return [];
          return this._toResources(data.resourceCollection);
        }),
      );
  }

  getResourcesBySkillSlug(skillSlug: string): Observable<Resource[]> {
    console.log(skillSlug);
    return this._contentfulClient
      .query<Query>({
        query: getResourcesBySkill,
        variables: {
          skillSlug,
        },
      })
      .pipe(
        tap(console.log),
        map(({ data }) => {
          if (!data) return [];
          const skillItem = data.skillCollection?.items?.[0];
          const resourceCollection =
            skillItem?.linkedFrom?.resourceCollection;
          if (!resourceCollection) {
            return [];
          }
          return this._toResources(resourceCollection);
        }),
        /* We have to filter again because the previous query also returns
         * resource that have this skill in the `skills` field.
         * AFAIK, there is no way to return only resources that have this
         * skill in `requiredSkills` field. */
        map((resources) =>
          resources.filter(
            (resource) =>
              resource.skills.find((skill) => skill.slug === skillSlug) &&
              /* Hide wip resources except if we are in wip mode. */
              (this._wip.isWip() || resource.isWip !== true),
          ),
        ),
      );
  }

  private _toResources(
    resourceCollection: contentful.ResourceCollection,
  ): Resource[] {
    return (resourceCollection.items ?? [])
      .filter((item): item is contentful.Resource => item != null)
      .map((item) =>
        createResource({
          id: item.sys?.id ?? '',
          author: item.author
            ? createAuthor({
                name: item.author.name ?? '',
                pictureUri: item.author.picture?.url ?? '',
              })
            : undefined,
          duration: item.duration ?? 0,
          isWip: item.isWip ?? undefined,
          pictureUri: item.picture?.url ?? undefined,
          releasedAt:
            item.releasedAt != null
              ? new Date(Date.parse(item.releasedAt))
              : undefined,
          requiredSkills: this._toSkills(item.requiredSkillCollection),
          skills: this._toSkills(item.skillCollection),
          slug: item.slug ?? '',
          summary: item.summary ?? '',
          title: item.title ?? '',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: item.resourceType as any,
          url: item.url ?? '',
        }),
      );
  }

  private _toSkills(
    skills:
      | { items: Array<contentful.Maybe<contentful.Skill>> }
      | null
      | undefined,
  ): Skill[] {
    return (skills?.items ?? [])
      .filter((s): s is contentful.Skill => s != null)
      .map(skillFragmentToSkill);
  }
}

@NgModule({
  providers: [ResourceRepository, provideContentfulClient()],
})
export class ResourceRepositoryModule {}
