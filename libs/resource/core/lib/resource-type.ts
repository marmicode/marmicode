export enum ResourceType {
  BlogPost = 'blog-post',
  Documentation = 'documentation',
  ExternalBlogPost = 'external-blog-post',
  ExternalVideo = 'external-video',
  Snack = 'snack',
  Workshop = 'workshop',
}

export type ResourceKind = 'article' | 'video';

/**
 * `external-video` is a video; every other type reads as an article.
 */
export function getResourceKind(type: ResourceType): ResourceKind {
  return type === ResourceType.ExternalVideo ? 'video' : 'article';
}
