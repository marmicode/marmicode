import { HttpHeaders } from '@angular/common/http';
import {
  EnvironmentProviders,
  inject,
  Injectable,
  Injector,
  makeEnvironmentProviders,
} from '@angular/core';
import { pendingUntilEvent } from '@angular/core/rxjs-interop';
import { ApolloQueryResult, QueryOptions } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { Observable } from 'rxjs';

export function provideContentfulClient(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    Apollo,
    ContentfulClient,
  ]);
}

@Injectable()
export class ContentfulClient {
  private _apollo = inject(Apollo);
  private _injector = inject(Injector);

  query<QUERY>(options: QueryOptions): Observable<ApolloQueryResult<QUERY>> {
    return this._apollo
      .query<QUERY>(options)
      .pipe(pendingUntilEvent(this._injector));
  }
}

const uri =
  'https://graphql.contentful.com/content/v1/spaces/gowvxq3b4aid/environments/master';

function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders({
        authorization: `Bearer _d7Vb4r2lborp1uLTvsv0ne7fB0OMez2FscTnHQux5A`,
      }),
    }),
    cache: new InMemoryCache(),
  };
}
