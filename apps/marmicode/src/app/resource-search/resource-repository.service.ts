import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphQLModule } from '../graphql.module';
import { Query } from '../graphql/schema';
import * as schema from '../graphql/schema';
import { createAuthor, createResource, Resource } from './resource';
import { createSkill, Skill } from './skill';

const AllResourcesQuery = gql`
  query Resources {
    resourceCollection {
      items {
        sys {
          id
        }
        title
        picture {
          url
        }
        duration
        summary
        url
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
        query: AllResourcesQuery,
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
              requiredSkills: item.requiredSkillCollection.items.map(
                this._toSkill
              ),
              skills: item.skillCollection.items.map(this._toSkill),
              summary: item.summary,
              url: item.url,
            })
          )
        )
      );
  }

  private _toSkill(skill: schema.Skill): Skill {
    return createSkill({
      id: skill.sys.id,
      label: skill.label,
      slug: skill.slug,
    });
  }
}

@NgModule({
  imports: [GraphQLModule],
  providers: [ResourceRepository],
})
export class ResourceRepositoryModule {}
