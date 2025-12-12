import { BlogPost } from '@marmicode/blog-post/ui';
import { createArticlePageInfo } from '@marmicode/shared/ui';

export function blogPostToPageInfo(blogPost: BlogPost) {
  return createArticlePageInfo({
    author: blogPost.author,
    description: blogPost.summary,
    pictureUri: blogPost.pictureUri,
    title: blogPost.title,
  });
}
