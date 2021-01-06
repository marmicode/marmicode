import { ResourceType } from '@marmicode/resource-core';

export interface BlogPostContent {
  text: string;
}

export interface BlogPost {
  id: string;
  type: ResourceType.BlogPost;
  title: string;
  content: BlogPostContent;
}

export function createBlogPost(blogPost: Omit<BlogPost, 'type'>) {
  return { ...blogPost, type: ResourceType.BlogPost };
}
