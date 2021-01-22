import { TestBed } from '@angular/core/testing';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import {
  BlogPostRepository,
  BlogPostRepositoryModule,
} from './blog-post-repository.service';

describe('BlogPostRepository', () => {
  let blogPostRepository: BlogPostRepository;
  let mockResourceCollectionResolver: jest.Mock;

  beforeEach(async () => {
    mockResourceCollectionResolver = jest.fn();
    await TestBed.configureTestingModule({
      imports: [BlogPostRepositoryModule],
      providers: [
        Apollo,
        {
          provide: APOLLO_OPTIONS,
          useFactory() {
            return {
              resolvers: {
                ResourceCollection: mockResourceCollectionResolver,
              },
            };
          },
        },
      ],
    });
    blogPostRepository = TestBed.inject(BlogPostRepository);
  });

  it('🚧 should query blog post and convert to `BlogPost` type', async () => {
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
  });
});
