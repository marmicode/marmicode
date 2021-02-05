import { BlogPost } from '@marmicode/blog-post-ui';
import { createArticlePageMeta } from '@marmicode/shared-ui';

export function blogPostToMeta(blogPost: BlogPost) {
  return createArticlePageMeta({
    title: blogPost.title,
    pictureUri: blogPost.pictureUri,
  });
}
