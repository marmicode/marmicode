import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlogPostComponent, createBlogPost } from '@marmicode/blog-post-ui';
import { WipModule, WipService } from '@marmicode/shared-utils';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  beforeEach(async () => {
    return TestBed.configureTestingModule({
      declarations: [BlogPostComponent],
      providers: [
        {
          provide: WipService,
          useValue: { isWip: jest.fn().mockReturnValue(true) },
        },
      ],
      imports: [WipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
  });

  it('🚧 should pass the right information to share buttons', () => {
    component.blogPost = createBlogPost({
      id: 'blog-post-id',
      author: {
        name: 'Younes Jaaidi',
        pictureUri: null,
        twitter: 'yjaaidi',
      },
      duration: 6,
      pictureUri: 'https://picture.url',
      releasedAt: null,
      summary: 'Life is too short...',
      title: 'Title',
      text: 'content',
    });
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('mc-share-buttons')).properties
    ).toEqual(
      expect.objectContaining({
        author: expect.objectContaining({
          twitter: 'yjaaidi',
        }),
        title: 'Title',
      })
    );
  });
});
