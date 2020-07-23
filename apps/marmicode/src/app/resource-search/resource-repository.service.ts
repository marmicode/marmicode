import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { GraphQLModule } from '../graphql.module';
import { Query } from '../graphql/schema';
import { createResource, Resource } from './resource';

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
    return this._apollo.query<Query>({
      query: AllResourcesQuery,
    });
    // .pipe(
    //   map(({ data }) => {
    //     return data.resourceCollection.items.map((item) => {
    //       return createResource({
    //         id: item.sys.id,
    //       });
    //     });
    //   })
    // );
  }
}

@NgModule({
  imports: [GraphQLModule],
  providers: [ResourceRepository],
})
export class ResourceRepositoryModule {}
