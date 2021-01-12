export enum ResourceType {
  BlogPost = 'blog-post',
  Documentation = 'documentation',
  ExternalBlogPost = 'external-blog-post',
  ExternalVideo = 'external-video',
  Recipe = 'recipe',
  Snack = 'snack',
  Tutorial = 'tutorial',
  Workshop = 'workshop',
}

export const resourceTypeColorMap = new Map<ResourceType, string>([
  [ResourceType.BlogPost, '#03a9f4'],
  [ResourceType.Documentation, '#d42020'],
  [ResourceType.ExternalBlogPost, '#f57bb5'],
  [ResourceType.ExternalVideo, '#d0b736'],
  [ResourceType.Recipe, '#5ab3ad'],
  [ResourceType.Snack, '#4caf50'],
  [ResourceType.Tutorial, '#4281ff'],
  [ResourceType.Workshop, '#673ab7'],
]);

export function getResourceTypeColor(resourceType: ResourceType) {
  return resourceTypeColorMap.get(resourceType);
}

export const resourceTypeTextMap = new Map<ResourceType, string>([
  [ResourceType.BlogPost, 'Blog Post'],
  [ResourceType.Documentation, 'Documentation'],
  [ResourceType.ExternalBlogPost, 'Blog Post'],
  [ResourceType.ExternalVideo, 'Video'],
  [ResourceType.Recipe, 'Recipe'],
  [ResourceType.Snack, 'Snack'],
  [ResourceType.Tutorial, 'Tutorial'],
  [ResourceType.Workshop, 'Workshop'],
]);

export function getResourceTypeText(resourceType: ResourceType) {
  return resourceTypeTextMap.get(resourceType);
}

export const resourceTypeActionMap = new Map<ResourceType, string>([
  [ResourceType.BlogPost, 'Read'],
  [ResourceType.Documentation, 'Read'],
  [ResourceType.ExternalBlogPost, 'Read'],
  [ResourceType.ExternalVideo, 'Watch'],
  [ResourceType.Recipe, `Let's cook!`],
  [ResourceType.Snack, `Let's eat!`],
  [ResourceType.Tutorial, `Let's cook!`],
  [ResourceType.Workshop, 'Register'],
]);

export function getResourceTypeActionText(resourceType: ResourceType) {
  return resourceTypeActionMap.get(resourceType);
}
