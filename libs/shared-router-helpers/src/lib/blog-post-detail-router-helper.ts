export const blogPostDetailRouterHelper = {
  BLOG_POST_DETAIL_PATH: 'blog',
  BLOG_POST_SLUG_PARAM: 'blogPostSlug',
  blogPostDetail(blogPostSlug: string) {
    return ['/', this.BLOG_POST_DETAIL_PATH, blogPostSlug];
  },
};
