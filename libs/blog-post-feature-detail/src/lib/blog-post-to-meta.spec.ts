import { createBlogPost } from '@marmicode/blog-post-ui';
import { blogPostToPageInfo } from './blog-post-to-page-info';

describe('blogPostToMeta', () => {
  it('should convert blog post to meta', () => {
    const blogPost = createBlogPost({
      id: 'blog-post-id',
      title: 'Title',
      pictureUri: 'https://picture.url',
      text: 'content',
    });

    expect(blogPostToPageInfo(blogPost)).toEqual({
      type: 'article',
      title: 'Title',
      pictureUri: 'https://picture.url',
    });
  });
});
