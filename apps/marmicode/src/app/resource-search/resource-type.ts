export enum ResourceType {
  BlogPost = 'blog-post',
  Recipe = 'recipe',
  Snack = 'snack',
  Video = 'video',
}

export const resourceTypeColorMap = new Map<ResourceType, string>([
  [ResourceType.BlogPost, '#800080'],
  [ResourceType.Recipe, '#800080'],
  [ResourceType.Snack, '#800080'],
  [ResourceType.Video, '#800080'],
]);

export const resourceTypeTextMap = new Map<ResourceType, string>([
  [ResourceType.BlogPost, 'Blog Post'],
  [ResourceType.Recipe, 'Recipe'],
  [ResourceType.Snack, 'Snack'],
  [ResourceType.Video, 'Video'],
]);
