const WORKSHOP_LIST_PATH = 'workshops';
const WORKSHOP_DETAIL_RELATIVE_PATH = ':workshopId';

export const workshopRouterHelper = {
  WORKSHOP_DETAIL_RELATIVE_PATH,
  WORKSHOP_DETAIL_PATH: `${WORKSHOP_LIST_PATH}/${WORKSHOP_DETAIL_RELATIVE_PATH}`,
  WORKSHOP_LIST_PATH,

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
