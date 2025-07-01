import { describe, expect, it } from '@jest/globals';
import { createBlogPost } from '@marmicode/blog-post-ui';
import { blogPostToPageInfo } from './blog-post-to-page-info';

describe('blogPostToMeta', () => {
  it('should convert blog post to meta', () => {
    const blogPost = createBlogPost({
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

    expect(blogPostToPageInfo(blogPost)).toEqual({
      type: 'article',
      author: {
        name: 'Younes Jaaidi',
        pictureUri: null,
        twitter: 'yjaaidi',
      },
      description: 'Life is too short...',
      pictureUri: 'https://picture.url',
      title: 'Title',
    });
  });
});
