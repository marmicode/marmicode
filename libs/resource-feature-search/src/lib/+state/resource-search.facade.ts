import { inject, Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import {
  getSelectedSkillSlug,
  RouterPartialState,
} from './resource-search.selectors';

@Injectable()
export class ResourceSearchFacade {
  private _store = inject<Store<RouterPartialState>>(Store);
  selectedSkillSlug$ = this._store.pipe(select(getSelectedSkillSlug));
}
