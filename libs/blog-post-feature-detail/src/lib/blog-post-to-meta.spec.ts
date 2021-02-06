import { createBlogPost } from '@marmicode/blog-post-ui';
import { blogPostToPageInfo } from './blog-post-to-page-info';

describe('blogPostToMeta', () => {
  it('should convert blog post to meta', () => {
    const blogPost = createBlogPost({
      id: 'blog-post-id',
      author: {
        name: 'Younes Jaaidi',
        twitter: 'yjaaidi',
      },
      pictureUri: 'https://picture.url',
      summary: 'Life is too short...',
      title: 'Title',
      text: 'content',
    });

    expect(blogPostToPageInfo(blogPost)).toEqual({
      type: 'article',
      author: {
        name: 'Younes Jaaidi',
        twitter: 'yjaaidi',
      },
      description: 'Life is too short...',
      pictureUri: 'https://picture.url',
      title: 'Title',
    });
  });
});
