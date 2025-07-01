export const workshopDetailRouterHelper = {
  WORKSHOP_DETAIL_PATH: 'workshop/:workshopId',
  detail: (workshopId: string) => `/workshop/${encodeURIComponent(workshopId)}`,
};
