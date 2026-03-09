export interface BlogPost {
  id: string;
  author: {
    name: string;
    pictureUri: string | null;
    twitter: string;
  };
  duration: number;
  pictureUri: string | null;
  releasedAt: Date | null;
  summary: string;
  title: string;
  text: string;
}
export function createBlogPost(blogPost: BlogPost) {
  return { ...blogPost };
}
