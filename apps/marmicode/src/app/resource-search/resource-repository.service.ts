import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { GraphQLModule } from '../graphql.module';
import { Query } from '../graphql/schema';
import { createAuthor, createResource, Resource } from './resource';

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

  getResources() {
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
              // @todo
              requiredSkills: [],
              skills: [],
              summary: item.summary,
              url: item.url,
            })
          )
        )
      );
  }
}

@NgModule({
  imports: [GraphQLModule],
  providers: [ResourceRepository],
})
export class ResourceRepositoryModule {}
