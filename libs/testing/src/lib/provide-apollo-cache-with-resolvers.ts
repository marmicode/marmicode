import { Provider } from '@angular/core';
import {
  FieldPolicy,
  FieldReadFunction,
} from '@apollo/client/cache/inmemory/policies';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_TESTING_CACHE } from 'apollo-angular/testing';

/**
 * This is useful if you really want to test the query and the response
 * mapping logic instead of mocking the whole interaction.
 *
 * @param fields: resolvers
 */
export function provideApolloCacheWithResolvers(fields: {
  [fieldName: string]: FieldPolicy | FieldReadFunction;
}): Provider {
  return {
    provide: APOLLO_TESTING_CACHE,
    useValue: new InMemoryCache({
      typePolicies: {
        Query: {
          fields,
        },
      },
    }),
  };
}
