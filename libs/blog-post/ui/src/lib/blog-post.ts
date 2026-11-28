export interface BlogPost {
  id: string;
  author: {
    name: string;
    pictureUri?: string;
    twitter: string;
    /** Bluesky handle, e.g. `younesjd.dev`. */
    bluesky?: string;
    /** LinkedIn profile id, as in `linkedin.com/in/<id>`. */
    linkedin?: string;
  };
  duration: number;
  pictureUri?: string;
  releasedAt: Date;
  summary: string;
  title: string;
  text: string;
}
export function createBlogPost(blogPost: BlogPost) {
  return { ...blogPost };
}
