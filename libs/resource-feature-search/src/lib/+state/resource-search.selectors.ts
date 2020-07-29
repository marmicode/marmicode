import * as fromRouter from '@ngrx/router-store';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { resourceSearchRouterHelper } from '../resource-search-router-helper';

export interface RouterPartialState {
  readonly router: RouterReducerState;
}

/* @hack this fixes warning when using `createFeatureSelector`:
 * The feature name "router" does not exist in the state, therefore createFeatureSelector cannot access it.
 * Cf. https://stackoverflow.com/questions/58214913/how-to-silence-the-feature-name-router-does-not-exist-in-the-state-ngrx-r */
export const selectRouter = createSelector(
  (state: RouterPartialState) => state.router,
  (router) => router
);

export const { selectRouteParam } = fromRouter.getSelectors(selectRouter);

export const getSelectedSkillSlug = selectRouteParam(
  resourceSearchRouterHelper.SKILL_SLUG_PARAM
);
