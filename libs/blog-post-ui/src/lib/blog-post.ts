export interface BlogPost {
  id: string;
  author: {
    name: string;
    twitter: string;
  };
  pictureUri: string;
  summary: string;
  title: string;
  text: string;
}

export function createBlogPost(blogPost: BlogPost) {
  return { ...blogPost };
}
