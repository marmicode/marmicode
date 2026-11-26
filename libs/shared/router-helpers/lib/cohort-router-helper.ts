const COHORT_LIST_PATH = 'cohorts';
const FROM_DRIFT_TO_TRUST_WITH_ANGULAR_ID = 'from-drift-to-trust-with-angular';

export const cohortRouterHelper = {
  COHORT_LIST_PATH,
  FROM_DRIFT_TO_TRUST_WITH_ANGULAR_ID,
  FROM_DRIFT_TO_TRUST_WITH_ANGULAR_PATH: `${COHORT_LIST_PATH}/${FROM_DRIFT_TO_TRUST_WITH_ANGULAR_ID}`,

  detail(cohortId: string) {
    return ['/', this.COHORT_LIST_PATH, encodeURIComponent(cohortId)];
  },
  detailUrl(cohortId: string) {
    return `/${this.detail(cohortId).slice(1).join('/')}`;
  },
};
