export const resourceSearchRouterHelper = {
  LEARN_PATH: 'learn',
  learn(skillSlug: string) {
    return ['/', this.LEARN_PATH, skillSlug];
  },
};
