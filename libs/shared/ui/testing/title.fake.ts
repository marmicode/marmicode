import { Title } from '@angular/platform-browser';
import { OmitPrivate } from '@marmicode/shared/utils';

export class TitleFake implements OmitPrivate<Title> {
  private _title: string;

  setTitle(title: string) {
    this._title = title;
  }

  getTitle(): string {
    return this._title;
  }
}

export function provideTitleFake() {
  return [TitleFake, { provide: Title, useExisting: TitleFake }];
}
