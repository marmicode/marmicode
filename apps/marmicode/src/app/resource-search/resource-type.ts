export enum ResourceType {
  BlogPost = 'blog-post',
  Recipe = 'recipe',
  Snack = 'snack',
  Video = 'video',
  Workshop = 'workshop',
}

export const resourceTypeColorMap = new Map<ResourceType, string>([
  [ResourceType.BlogPost, '#66985f'],
  [ResourceType.Recipe, '#5ab3ad'],
  [ResourceType.Snack, '#f57bb5'],
  [ResourceType.Video, '#eb8053'],
  [ResourceType.Workshop, '#673ab7'],
]);

export const resourceTypeTextMap = new Map<ResourceType, string>([
  [ResourceType.BlogPost, 'Blog Post'],
  [ResourceType.Recipe, 'Recipe'],
  [ResourceType.Snack, 'Snack'],
  [ResourceType.Video, 'Video'],
  [ResourceType.Workshop, 'Workshop'],
]);
