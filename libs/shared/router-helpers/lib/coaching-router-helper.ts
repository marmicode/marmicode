export const coachingRouterHelper = {
  COACHING_PATH: 'coaching',

  coaching() {
    return ['/', this.COACHING_PATH];
  },

  coachingUrl() {
    return `/${this.COACHING_PATH}`;
  },
};
