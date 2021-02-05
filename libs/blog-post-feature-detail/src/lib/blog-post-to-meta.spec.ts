import { createBlogPost } from '@marmicode/blog-post-ui';
import { blogPostToMeta } from './blog-post-to-meta';

describe('blogPostToMeta', () => {
  it('should convert blog post to meta', () => {
    const blogPost = createBlogPost({
      id: 'blog-post-id',
      title: 'Title',
      pictureUri: 'https://picture.url',
      text: 'content',
    });

    expect(blogPostToMeta(blogPost)).toEqual({
      type: 'article',
      title: 'Title',
      pictureUri: 'https://picture.url',
    });
  });
});
