import { TestBed } from '@angular/core/testing';
import { InMemoryCache } from '@apollo/client/core';
import {
  APOLLO_TESTING_CACHE,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { BlogPostRepository } from './blog-post-repository.service';

describe('BlogPostRepository', () => {
  let blogPostRepository: BlogPostRepository;
  let mockResourceCollectionResolver: jest.Mock;

  beforeEach(async () => {
    mockResourceCollectionResolver = jest.fn();
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [
        BlogPostRepository,
        {
          provide: APOLLO_TESTING_CACHE,
          useValue: new InMemoryCache({
            typePolicies: {
              Query: {
                fields: {
                  resourceCollection: {
                    read: mockResourceCollectionResolver,
                  },
                },
              },
            },
          }),
        },
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
