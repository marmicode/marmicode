export const workshopRouterHelper = {
  WORKSHOP_DETAIL_PATH: 'workshops/:workshopId',
  WORKSHOP_LIST_PATH: 'workshops',
  detail(workshopId: string) {
    return ['/', this.WORKSHOP_LIST_PATH, encodeURIComponent(workshopId)];
  },
  detailUrl(workshopId: string) {
    return `/${this.detail(workshopId).slice(1).join('/')}`;
  },
  list() {
    return ['/', this.WORKSHOP_LIST_PATH];
  },
};
