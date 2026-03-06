import { Title } from '@angular/platform-browser';
import { Public } from '@marmicode/shared/utils';

export class TitleFake implements Public<Title> {
  private _title: string | undefined = undefined;

  setTitle(title: string) {
    this._title = title;
  }

  getTitle(): string | undefined {
    return this._title;
  }
}

export function provideTitleFake() {
  return [TitleFake, { provide: Title, useExisting: TitleFake }];
}
