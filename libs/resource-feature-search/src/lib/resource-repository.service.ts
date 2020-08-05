import { Injectable, NgModule } from '@angular/core';
import { WipService } from '@marmicode/shared-utils';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphQLModule } from './graphql/graphql.module';
import * as schema from './graphql/schema';
import { Query, ResourceFilter, SkillFilter } from './graphql/schema';
import { skillFragment, skillFragmentToSkill } from './graphql/skill-fragment';
import { createAuthor, createResource, Resource } from './resource';
import { Skill } from './skill';

const resourceFragment = gql`
  ${skillFragment}
  fragment ResourceFragment on Resource {
    sys {
      id
    }
    resourceType
    title
    author {
      name
      picture {
        url
      }
    }
    duration
    picture {
      url
    }
    requiredSkillCollection(limit: 10) {
      items {
        ...SkillFragment
      }
    }
    skillCollection(limit: 10) {
      items {
        ...SkillFragment
      }
    }
    summary
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
  query getResourcesBySkill($skillFilter: SkillFilter) {
    skillCollection(limit: 1, where: $skillFilter) {
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
  /* Hide wip resources except if we are in wip mode. */
  private _baseFilter = this._wip.isWip() ? {} : { isWip_not: true };

  constructor(private _apollo: Apollo, private _wip: WipService) {}

  getResources(): Observable<Resource[]> {
    return this._apollo
      .query<Query>({
        query: getAllResources,
        variables: {
          filter: {
            ...this._baseFilter,
          } as ResourceFilter,
        },
      })
      .pipe(map(({ data }) => this._toResources(data.resourceCollection)));
  }

  getResourcesBySkillSlug(skillSlug: string): Observable<Resource[]> {
    return this._apollo
      .query<Query>({
        query: getResourcesBySkill,
        variables: {
          skillFilter: {
            slug: skillSlug,
            ...this._baseFilter,
          } as SkillFilter,
        },
      })
      .pipe(
        map(({ data }) =>
          this._toResources(
            data.skillCollection.items[0].linkedFrom.resourceCollection
          )
        ),
        /* We have to filter again because the previous query also returns
         * resource that have this skill in the `skills` field.
         * AFAIK, there is no way to return only resources that have this
         * skill in `requiredSkills` field. */
        map((resources) =>
          resources.filter((resource) =>
            resource.skills.find((skill) => skill.slug === skillSlug)
          )
        )
      );
  }

  private _toResources(resourceCollection: {
    items: schema.Resource[];
  }): Resource[] {
    return resourceCollection.items.map((item) =>
      createResource({
        id: item.sys.id,
        type: item.resourceType as any,
        title: item.title,
        author:
          item.author &&
          createAuthor({
            name: item.author.name,
            pictureUri: item.author.picture.url,
          }),
        duration: item.duration,
        pictureUri: item.picture.url,
        requiredSkills: this._toSkills(item.requiredSkillCollection),
        skills: this._toSkills(item.skillCollection),
        summary: item.summary,
        url: item.url,
      })
    );
  }

  private _toSkills(skills: { items: schema.Skill[] }): Skill[] {
    return skills?.items.map(skillFragmentToSkill);
  }
}

@NgModule({
  imports: [GraphQLModule],
  providers: [ResourceRepository],
})
export class ResourceRepositoryModule {}
