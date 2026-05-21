import { Injectable } from '@angular/core';
import { Workshop } from '@marmicode/workshop/core';
import { chartedCodingFullCourseEn } from './workshops/charted-coding/charted-coding.en';
import { chartedCodingFullCourseFr } from './workshops/charted-coding/charted-coding.fr';
import { pragmaticAngularTestingFullCourseEn } from './workshops/pragmatic-angular-testing/pragmatic-angular-testing.en';
import { pragmaticAngularTestingFullCourseFr } from './workshops/pragmatic-angular-testing/pragmatic-angular-testing.fr';
import { pragmaticReactTestingFullCourseEn } from './workshops/pragmatic-react-testing/pragmatic-react-testing.en';
import { pragmaticReactTestingFullCourseFr } from './workshops/pragmatic-react-testing/pragmatic-react-testing.fr';
import { pragmaticUiTestingWithPlaywrightFullCourseEn } from './workshops/pragmatic-ui-testing-with-playwright/pragmatic-ui-testing-with-playwright.en';
import { pragmaticUiTestingWithPlaywrightFullCourseFr } from './workshops/pragmatic-ui-testing-with-playwright/pragmatic-ui-testing-with-playwright.fr';

const WORKSHOPS: Workshop[][] = [
  [chartedCodingFullCourseEn, chartedCodingFullCourseFr],
  [pragmaticAngularTestingFullCourseEn, pragmaticAngularTestingFullCourseFr],
  [pragmaticReactTestingFullCourseEn, pragmaticReactTestingFullCourseFr],
  [
    pragmaticUiTestingWithPlaywrightFullCourseEn,
    pragmaticUiTestingWithPlaywrightFullCourseFr,
  ],
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
