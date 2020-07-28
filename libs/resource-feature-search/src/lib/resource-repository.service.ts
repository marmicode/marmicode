import { A } from '@angular/cdk/keycodes';
import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GraphQLModule } from './graphql.module';
import * as schema from './graphql/schema';
import { Query } from './graphql/schema';
import { skillFragment, skillFragmentToSkill } from './graphql/skill-fragment';
import { createAuthor, createResource, Resource } from './resource';
import { createSkill, Skill } from './skill';

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

const allResources = gql`
  ${resourceFragment}
  query {
    resourceCollection(order: [releasedAt_DESC]) {
      items {
        ...ResourceFragment
      }
    }
  }
`;

const resourcesBySkillSlug = gql`
  ${resourceFragment}
  query($skillSlug: String!) {
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
  constructor(private _apollo: Apollo) {}

  getResources(): Observable<Resource[]> {
    return this._apollo
      .query<Query>({
        query: allResources,
      })
      .pipe(
        map(({ data }) =>
          data.resourceCollection.items.map((item) =>
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
          )
        )
      );
  }

  getResourcesBySkillSlug(skillSlug: string): Observable<Resource[]> {
    return this._apollo
      .query<Query>({
        query: resourcesBySkillSlug,
        variables: {
          skillSlug,
        },
      })
      .pipe(
        map(({ data }) => {
          return this._toResources(
            data.skillCollection.items[0].linkedFrom.resourceCollection
          );
        }),
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
