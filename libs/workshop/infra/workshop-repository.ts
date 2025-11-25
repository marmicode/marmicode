import { Injectable } from '@angular/core';
import { Workshop } from '@marmicode/workshop/core';
import { pragmaticAngularTestingFullCourse } from './workshops/pragmatic-angular-testing-full-course';
import { pragmaticAngularTestingTapasSession } from './workshops/pragmatic-angular-testing-tapas-session';

@Injectable({ providedIn: 'root' })
export class WorkshopRepository {
  private _workshops: Workshop[] = [
    pragmaticAngularTestingFullCourse,
    pragmaticAngularTestingTapasSession,
  ].map((workshop) => ({
    ...workshop,
    pictureUri: this._fixPictureUri(workshop.pictureUri),
    thumbnailUri: this._fixPictureUri(workshop.thumbnailUri),
  }));
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

  private _fixPictureUri(pictureUri: string): string {
    return pictureUri.replace(/^\.\//, '/');
  }
}
