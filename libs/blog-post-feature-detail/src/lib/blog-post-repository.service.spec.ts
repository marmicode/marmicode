import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  FieldPolicy,
  FieldReadFunction,
} from '@apollo/client/cache/inmemory/policies';
import { InMemoryCache } from '@apollo/client/core';
import {
  APOLLO_TESTING_CACHE,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { BlogPostRepository } from './blog-post-repository.service';

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

describe('BlogPostRepository', () => {
  let blogPostRepository: BlogPostRepository;
  let mockResourceCollectionResolver: jest.Mock;

  beforeEach(() => {
    mockResourceCollectionResolver = jest.fn();
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [
        BlogPostRepository,
        provideApolloCacheWithResolvers({
          resourceCollection: mockResourceCollectionResolver,
        }),
      ],
    });
    blogPostRepository = TestBed.inject(BlogPostRepository);
  });

  it('should query blog post and convert to `BlogPost` type', async () => {
    mockResourceCollectionResolver.mockReturnValue({
      items: [
        {
          sys: {
            id: '62vt3ifOPzuBOv31JzHdMd',
          },
          title: 'End-to-End HTTP request cancelation with RxJS & NestJS',
          content: {
            __typename: 'BlogPost',
            text: 'Life is too short. ...',
          },
        },
      ],
    });

    const blogPost = await blogPostRepository
      .getBlogPost('end-to-end-http-request-cancelation-with-rxjs-and-nestjs')
      .toPromise();

    expect(blogPost).toEqual(
      expect.objectContaining({
        id: '62vt3ifOPzuBOv31JzHdMd',
        title: 'End-to-End HTTP request cancelation with RxJS & NestJS',
        text: expect.stringMatching(/Life is too short/),
      })
    );

    expect(mockResourceCollectionResolver).toBeCalledTimes(1);
    expect(mockResourceCollectionResolver).toBeCalledWith(
      undefined,
      expect.objectContaining({
        args: {
          limit: 1,
          where: {
            slug: 'end-to-end-http-request-cancelation-with-rxjs-and-nestjs',
          },
        },
      })
    );
  });
});
