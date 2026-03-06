import { BlogPost } from '@marmicode/blog-post/ui';
import { createArticlePageInfo } from '@marmicode/shared/ui';

export function blogPostToPageInfo(blogPost: BlogPost) {
  return createArticlePageInfo({
    author: {
      name: blogPost.author.name,
      pictureUri: blogPost.author.pictureUri ?? undefined,
      twitter: blogPost.author.twitter ?? undefined,
    },
    description: blogPost.summary,
    pictureUri: blogPost.pictureUri ?? undefined,
    title: blogPost.title ?? undefined,
  });
}
