export interface BlogPost {
  id: string;
  title: string;
  text: string;
}

export function createBlogPost(blogPost: BlogPost) {
  return { ...blogPost };
}
