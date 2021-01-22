import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';

describe('BlogPostRepository', () => {
  let mockQuery: jest.MockedFunction<typeof Apollo.prototype.query>;

  beforeEach(async () => {
    mockQuery = jest.fn();
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: Apollo,
          useValue: {
            query: mockQuery,
          },
        },
      ],
    });
  });

  xit('🚧 should query blog post and convert to `BlogPost` type', () => {});
});
