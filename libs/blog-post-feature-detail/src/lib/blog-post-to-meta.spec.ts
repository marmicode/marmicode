import { BlogPost, createBlogPost } from '@marmicode/blog-post-ui';
import { createArticlePageMeta } from '@marmicode/shared-ui';

function blogPostToMeta(blogPost: BlogPost) {
  return createArticlePageMeta({
    title: blogPost.title,
    pictureUri: blogPost.pictureUri,
  });
}

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
