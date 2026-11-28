import { inject, Injectable, NgModule } from '@angular/core';
import * as contentful from '@marmicode/contentful/infra';
import {
  ContentfulClient,
  provideContentfulClient,
  Query,
} from '@marmicode/contentful/infra';
import {
  createAuthor,
  getResourceTopics,
  ResourceType,
} from '@marmicode/resource/core';
import { WipService } from '@marmicode/shared/utils';
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

/* The types the site renders: recipes and tutorials are gone, for instance. */
const RESOURCE_TYPES = new Set<string>(Object.values(ResourceType));

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
        map(({ data }) =>
          this._toResources({
            items: data!.resourceCollection!.items.filter(
              (i): i is NonNullable<typeof i> => i != null,
            ),
          }),
        ),
      );
  }

  private _toResources(resourceCollection: {
    items: contentful.Resource[];
  }): Resource[] {
    const items = resourceCollection.items.filter(
      (item) =>
        item.resourceType != null && RESOURCE_TYPES.has(item.resourceType),
    );
    return items.map((item) => {
      const requiredSkills = this._toSkills({
        items: (item.requiredSkillCollection?.items ?? []).filter(
          (s): s is contentful.Skill => s != null,
        ),
      });
      const skills = this._toSkills({
        items: (item.skillCollection?.items ?? []).filter(
          (s): s is contentful.Skill => s != null,
        ),
      });
      return createResource({
        id: item.sys.id,
        author:
          item.author != null
            ? createAuthor({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                name: item.author.name!,
                pictureUri: item.author.picture?.url ?? undefined,
              })
            : undefined,
        duration: item.duration!,
        isWip: item.isWip as boolean | undefined,
        pictureUri:
          item.picture != null && item.picture.url != null
            ? item.picture.url
            : undefined,
        releasedAt: new Date(Date.parse(item.releasedAt!)),
        requiredSkills,
        skills,
        slug: item.slug!,
        summary: item.summary!,
        title: item.title!,
        topics: getResourceTopics({
          skillSlugs: [...skills, ...requiredSkills].map(({ slug }) => slug),
        }),
        type: item.resourceType as ResourceType,
        url: item.url!,
      });
    });
  }

  private _toSkills(skills: { items: contentful.Skill[] }): Skill[] {
    return skills.items.map(skillFragmentToSkill);
  }
}

@NgModule({
  providers: [ResourceRepository, provideContentfulClient()],
})
export class ResourceRepositoryModule {}
