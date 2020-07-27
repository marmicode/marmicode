export const resourceSearchRouterHelper = {
  LEARN_PATH: 'learn',
  SKILL_SLUG_PARAM: 'skillSlug',
  learn(skillSlug: string) {
    return ['/', this.LEARN_PATH, skillSlug];
  },
};
