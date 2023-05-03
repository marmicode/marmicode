import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from '@jest/globals';
import { PushPipe } from '@rx-angular/template/push';
import { BlogPost, createBlogPost } from './blog-post';
import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent', () => {
  it('should pass the right information to share buttons', () => {
    const {
      setBlogPost,
      getTwitterShareButtonsProperties,
      getOtherShareButtonsProperties,
    } = createComponent();
    setBlogPost(
      createBlogPost({
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
      })
    );

    expect(getTwitterShareButtonsProperties()).toEqual(
      expect.objectContaining({
        author: expect.objectContaining({
          twitter: 'yjaaidi',
        }),
        title: 'Title',
      })
    );

    expect(getOtherShareButtonsProperties()).toEqual(
      expect.objectContaining({
        author: expect.objectContaining({
          twitter: 'yjaaidi',
        }),
        title: 'Title',
      })
    );
  });

  function createComponent() {
    TestBed.configureTestingModule({
      declarations: [BlogPostComponent],
      imports: [PushPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    const fixture = TestBed.createComponent(BlogPostComponent);

    return {
      setBlogPost(blogPost: BlogPost) {
        fixture.componentInstance.blogPost = blogPost;
        fixture.detectChanges();
      },
      getTwitterShareButtonsProperties() {
        return fixture.debugElement.queryAll(By.css('mc-share-buttons'))[0]
          .properties;
      },
      getOtherShareButtonsProperties() {
        return fixture.debugElement.queryAll(By.css('mc-share-buttons'))[1]
          .properties;
      },
    };
  }
});
