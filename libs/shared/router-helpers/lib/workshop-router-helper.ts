export const workshopRouterHelper = {
  WORKSHOP_DETAIL_PATH: 'workshops/:workshopId',
  WORKSHOP_LIST_PATH: 'workshops',
  detail(workshopId: string) {
    return ['/', this.WORKSHOP_LIST_PATH, encodeURIComponent(workshopId)];
  },
  list() {
    return '/workshops';
  },
};
