import { TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { provideApolloCacheWithResolvers } from '@marmicode/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { BlogPostRepository } from './blog-post-repository.service';

describe('BlogPostRepository', () => {
  let blogPostRepository: BlogPostRepository;
  let mockResourceCollectionResolver: jest.Mock;
  const fakeGraphqlResponse = {
    items: [
      {
        sys: {
          id: '62vt3ifOPzuBOv31JzHdMd',
        },
        author: {
          name: 'Younes Jaaidi',
          picture: {
            url: 'https://picture.url/younes',
          },
          twitter: 'yjaaidi',
        },
        duration: 6,
        picture: {
          url: 'https://picture.url/e2e-http-request-cancelation',
        },
        releasedAt: new Date(2021, 0, 0),
        summary: `Life is too short...`,
        title: 'End-to-End HTTP request cancelation with RxJS & NestJS',
        content: {
          __typename: 'BlogPost',
          text: 'Life is too short. ...',
        },
      },
    ],
  };

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
    mockResourceCollectionResolver.mockReturnValue(fakeGraphqlResponse);

    const blogPost = await blogPostRepository
      .getBlogPost('end-to-end-http-request-cancelation-with-rxjs-and-nestjs')
      .toPromise();

    expect(blogPost).toEqual(
      expect.objectContaining({
        id: '62vt3ifOPzuBOv31JzHdMd',
        author: {
          name: 'Younes Jaaidi',
          pictureUri: 'https://picture.url/younes',
          twitter: 'yjaaidi',
        },
        duration: 6,
        pictureUri: 'https://picture.url/e2e-http-request-cancelation',
        releasedAt: new Date(2021, 0, 0),
        summary: 'Life is too short...',
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

  it('should not crash if picture is not set', async () => {
    mockResourceCollectionResolver.mockReturnValue({
      ...fakeGraphqlResponse,
      items: [
        {
          ...fakeGraphqlResponse.items[0],
          picture: null,
        },
      ],
    });

    const blogPost = await blogPostRepository
      .getBlogPost('end-to-end-http-request-cancelation-with-rxjs-and-nestjs')
      .toPromise();

    expect(blogPost.pictureUri).toBeUndefined();
  });
});
