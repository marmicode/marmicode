import { inject, Injectable, NgModule } from '@angular/core';
import * as contentful from '@marmicode/contentful-infra';
import {
  ContentfulClient,
  provideContentfulClient,
  Query,
} from '@marmicode/contentful-infra';
import { createAuthor } from '@marmicode/resource-core';
import { WipService } from '@marmicode/shared-utils';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      .pipe(map(({ data }) => this._toResources(data.resourceCollection)));
  }

  getResourcesBySkillSlug(skillSlug: string): Observable<Resource[]> {
    return this._contentfulClient
      .query<Query>({
        query: getResourcesBySkill,
        variables: {
          skillSlug,
        },
      })
      .pipe(
        map(({ data }) =>
          this._toResources(
            data.skillCollection.items[0].linkedFrom.resourceCollection,
          ),
        ),
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

  private _toResources(resourceCollection: {
    items: contentful.Resource[];
  }): Resource[] {
    return resourceCollection.items.map((item) =>
      createResource({
        id: item.sys.id,
        author:
          item.author &&
          createAuthor({
            name: item.author.name,
            pictureUri: item.author.picture?.url,
          }),
        duration: item.duration,
        isWip: item.isWip,
        pictureUri: item.picture?.url,
        releasedAt: item.releasedAt && new Date(Date.parse(item.releasedAt)),
        requiredSkills: this._toSkills(item.requiredSkillCollection),
        skills: this._toSkills(item.skillCollection),
        slug: item.slug,
        summary: item.summary,
        title: item.title,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: item.resourceType as any,
        url: item.url,
      }),
    );
  }

  private _toSkills(skills: { items: contentful.Skill[] }): Skill[] {
    return skills?.items.map(skillFragmentToSkill);
  }
}

@NgModule({
  providers: [ResourceRepository, provideContentfulClient()],
})
export class ResourceRepositoryModule {}
