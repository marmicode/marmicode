import { Injectable } from '@angular/core';
import { Workshop } from '@marmicode/workshop/core';
import { pragmaticAngularTestingFullCourseEn } from './workshops/pragmatic-angular-testing.en';
import { pragmaticAngularTestingFullCourseFr } from './workshops/pragmatic-angular-testing.fr';

const WORKSHOPS: Workshop[][] = [
  [pragmaticAngularTestingFullCourseEn, pragmaticAngularTestingFullCourseFr],
];

@Injectable({ providedIn: 'root' })
export class WorkshopRepository {
  private _workshops: Workshop[] = WORKSHOPS.flatMap((group) =>
    group.map((workshop) => ({
      ...workshop,
      /* All but self. */
      alternates: group
        .filter((w) => w.id !== workshop.id)
        .map((w) => ({
          id: w.id,
          language: w.language,
        })),
      pictureUri: this._fixPictureUri(workshop.pictureUri),
      thumbnailUri: this._fixPictureUri(workshop.thumbnailUri),
    })),
  );

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
