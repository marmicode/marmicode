export const recipeDetailRouterHelper = {
  FRAME_SLUG_PARAM: 'frameSlug',
  RECIPE_DETAIL_PATH: 'recipe',
  RECIPE_SLUG_PARAM: 'recipeSlug',
  recipeFrame({
    recipeSlug,
    frameSlug,
  }: {
    recipeSlug: string;
    frameSlug: string;
  }) {
    return ['/', this.RECIPE_DETAIL_PATH, recipeSlug, frameSlug];
  },
};
