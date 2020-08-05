export enum ResourceType {
  Documentation = 'documentation',
  ExternalBlogPost = 'external-blog-post',
  ExternalVideo = 'external-video',
  Recipe = 'recipe',
  Snack = 'snack',
  Tutorial = 'tutorial',
  Workshop = 'workshop',
}

export const resourceTypeColorMap = new Map<ResourceType, string>([
  [ResourceType.ExternalBlogPost, '#66985f'],
  [ResourceType.ExternalVideo, '#eb8053'],
  [ResourceType.Documentation, '#d42020'],
  [ResourceType.Recipe, '#5ab3ad'],
  [ResourceType.Snack, '#f57bb5'],
  [ResourceType.Tutorial, '#4281ff'],
  [ResourceType.Workshop, '#673ab7'],
]);

export const resourceTypeTextMap = new Map<ResourceType, string>([
  [ResourceType.Documentation, 'Documentation'],
  [ResourceType.ExternalBlogPost, 'Blog Post'],
  [ResourceType.ExternalVideo, 'Video'],
  [ResourceType.Recipe, 'Recipe'],
  [ResourceType.Snack, 'Snack'],
  [ResourceType.Tutorial, 'Tutorial'],
  [ResourceType.Workshop, 'Workshop'],
]);

export const resourceTypeActionMap = new Map<ResourceType, string>([
  [ResourceType.Documentation, 'Read'],
  [ResourceType.ExternalBlogPost, 'Read'],
  [ResourceType.ExternalVideo, 'Watch'],
  [ResourceType.Recipe, `Let's cook!`],
  [ResourceType.Snack, `Let's eat!`],
  [ResourceType.Tutorial, `Let's cook!`],
  [ResourceType.Workshop, 'Register'],
]);
