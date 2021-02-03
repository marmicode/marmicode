import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-page',
  template: ` <ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: block;
        background-color: white;
        min-height: 100%;
      }
    `,
  ],
  providers: [RxState],
})
export class PageComponent {
  @Input() set title(title: string) {
    this._state.set({ title });
  }

  constructor(
    private _state: RxState<{ title: string; test: boolean }>,
    private _titleService: Title
  ) {
    /* Initialize title. */
    this._state.set({ title: null });
    this._state.hold(
      this._state
        .select('title')
        .pipe(map((title) => (title ? `${title} | Marmicode` : 'Marmicode'))),
      (title) => this._titleService.setTitle(title)
    );
  }
}

@NgModule({
  declarations: [PageComponent],
  exports: [PageComponent],
  imports: [CommonModule],
})
export class PageModule {}
