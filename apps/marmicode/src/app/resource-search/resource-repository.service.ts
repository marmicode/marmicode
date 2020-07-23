import { Injectable, NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GraphQLModule } from '../graphql.module';

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
    return this._apollo.query({
      query: AllResourcesQuery,
    });
  }
}

@NgModule({
  imports: [GraphQLModule],
  providers: [ResourceRepository],
})
export class ResourceRepositoryModule {}
