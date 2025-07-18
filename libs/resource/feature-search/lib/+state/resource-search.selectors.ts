import { resourceSearchRouterHelper } from '@marmicode/shared/router-helpers';
import * as fromRouter from '@ngrx/router-store';
import { RouterReducerState } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';

export interface RouterPartialState {
  readonly router: RouterReducerState;
}

/* @hack this fixes warning when using `createFeatureSelector`:
 * The feature name "router" does not exist in the state, therefore createFeatureSelector cannot access it.
 * Cf. https://stackoverflow.com/questions/58214913/how-to-silence-the-feature-name-router-does-not-exist-in-the-state-ngrx-r */
export const selectRouter = createSelector(
  (state: RouterPartialState) => state.router,
  (router) => router,
);

export const { selectRouteParam } = fromRouter.getRouterSelectors(selectRouter);

export const getSelectedSkillSlug = selectRouteParam(
  resourceSearchRouterHelper.SKILL_SLUG_PARAM,
);
