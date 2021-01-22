import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';

describe('BlogPostRepository', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [Apollo],
    });
  });

  xit('🚧 should query blog post and convert to `BlogPost` type', () => {});
});
