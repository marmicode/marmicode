export interface BlogPostContent {
  text: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: BlogPostContent;
}

export function createBlogPost(blogPost: BlogPost) {
  return { ...blogPost };
}
