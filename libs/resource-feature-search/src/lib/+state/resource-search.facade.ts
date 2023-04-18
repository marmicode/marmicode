import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';
import {
  getSelectedSkillSlug,
  RouterPartialState
} from './resource-search.selectors';

@Injectable()
export class ResourceSearchFacade {
  selectedSkillSlug$ = this.store.pipe(select(getSelectedSkillSlug));

  constructor(private store: Store<RouterPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
