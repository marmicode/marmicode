import { Injectable } from '@angular/core';
import { Workshop } from '@marmicode/workshop/core';
import { pragmaticAngularTesting } from './workshops/pragmatic-angular-testing-tapas-session';

@Injectable({ providedIn: 'root' })
export class WorkshopRepository {
  private _workshops: Workshop[] = [pragmaticAngularTesting];
  private _workshopsRecord = this._workshops.reduce(
    (acc, workshop) => ({ ...acc, [workshop.id]: workshop }),
    {} as Record<string, Workshop>,
  );

  findWorkshop(id: string): Workshop | undefined {
    return this._workshopsRecord[id];
  }

  getWorkshops(): Workshop[] {
    return this._workshops;
  }
}
