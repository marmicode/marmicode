import { BlogPost } from '@marmicode/blog-post-ui';
import { createArticlePageInfo } from '@marmicode/shared-ui';

export function blogPostToPageInfo(blogPost: BlogPost) {
  return createArticlePageInfo({
    title: blogPost.title,
    pictureUri: blogPost.pictureUri,
  });
}
