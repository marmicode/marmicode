export const resourceSearchRouterHelper = {
  LEARN_PATH: 'learn',
  SKILL_SLUG_PARAM: 'skillSlug',
  EVERYTHING: 'everything',
  learn(skillSlug: string) {
    return ['/', this.LEARN_PATH, skillSlug];
  },
  learnEverything() {
    return ['/', this.LEARN_PATH, this.EVERYTHING];
  },
};
