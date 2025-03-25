import { inject, Injectable, Injector } from '@angular/core';
import { pendingUntilEvent } from '@angular/core/rxjs-interop';
import { ApolloQueryResult, QueryOptions } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GqlClient {
  private _apollo = inject(Apollo);
  private _injector = inject(Injector);

  query<QUERY>(options: QueryOptions): Observable<ApolloQueryResult<QUERY>> {
    return this._apollo
      .query<QUERY>(options)
      .pipe(pendingUntilEvent(this._injector));
  }
}
