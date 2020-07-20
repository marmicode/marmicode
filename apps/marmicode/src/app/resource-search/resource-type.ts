export enum ResourceType {
  BlogPost = 'blog-post',
  Recipe = 'recipe',
  Snack = 'snack',
  Video = 'video',
  Workshop = 'workshop',
}

export const resourceTypeColorMap = new Map<ResourceType, string>([
  [ResourceType.BlogPost, '#673ab7'],
  [ResourceType.Recipe, '#800080'],
  [ResourceType.Snack, '#800080'],
  [ResourceType.Video, '#800080'],
  [ResourceType.Workshop, '#673ab7'],
]);

export const resourceTypeTextMap = new Map<ResourceType, string>([
  [ResourceType.BlogPost, 'Blog Post'],
  [ResourceType.Recipe, 'Recipe'],
  [ResourceType.Snack, 'Snack'],
  [ResourceType.Video, 'Video'],
  [ResourceType.Workshop, 'Workshop'],
]);
