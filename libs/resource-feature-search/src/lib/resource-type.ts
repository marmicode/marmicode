export enum ResourceType {
  Documentation = 'documentation',
  ExternalBlogPost = 'external-blog-post',
  ExternalVideo = 'external-video',
  Recipe = 'recipe',
  Snack = 'snack',
  Workshop = 'workshop',
}

export const resourceTypeColorMap = new Map<ResourceType, string>([
  [ResourceType.ExternalBlogPost, '#F1C470'],
  [ResourceType.ExternalVideo, '#94B0DB'],
  [ResourceType.Documentation, '#8FDB7C'],
  [ResourceType.Recipe, '#5ab3ad'],
  [ResourceType.Snack, '#f57bb5'],
  [ResourceType.Workshop, '#673ab7'],
]);

export const resourceTypeTextMap = new Map<ResourceType, string>([
  [ResourceType.Documentation, 'Documentation'],
  [ResourceType.ExternalBlogPost, 'Blog Post'],
  [ResourceType.ExternalVideo, 'Video'],
  [ResourceType.Recipe, 'Recipe'],
  [ResourceType.Snack, 'Snack'],
  [ResourceType.Workshop, 'Workshop'],
]);

export const resourceTypeActionMap = new Map<ResourceType, string>([
  [ResourceType.Documentation, 'Read'],
  [ResourceType.ExternalBlogPost, 'Read'],
  [ResourceType.ExternalVideo, 'Watch'],
  [ResourceType.Recipe, `Let's cook!`],
  [ResourceType.Snack, `Let's eat!`],
  [ResourceType.Workshop, 'Register'],
]);
