export interface BlogPost {
  id: string;
  author: {
    name: string;
    pictureUri: string;
    twitter: string;
  };
  duration: number;
  pictureUri: string;
  releasedAt: Date;
  summary: string;
  title: string;
  text: string;
}

export function createBlogPost(blogPost: BlogPost) {
  return { ...blogPost };
}
