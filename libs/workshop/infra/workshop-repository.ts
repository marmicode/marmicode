import { Injectable } from '@angular/core';
import { Workshop } from '@marmicode/workshop/core';
import { pragmaticAngularTestingTapasSession } from './workshops/pragmatic-angular-testing-tapas-session';
import { pragmaticAngularTestingFullCourse } from './workshops/pragmatic-angular-testing-full-course';

@Injectable({ providedIn: 'root' })
export class WorkshopRepository {
  private _workshops: Workshop[] = [
    pragmaticAngularTestingFullCourse,
    pragmaticAngularTestingTapasSession,
  ];
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
