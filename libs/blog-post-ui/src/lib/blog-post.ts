export interface BlogPost {
  id: string;
  pictureUri: string;
  title: string;
  text: string;
}

export function createBlogPost(blogPost: BlogPost) {
  return { ...blogPost };
}
