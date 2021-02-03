import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { Title } from '@angular/platform-browser';

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
})
export class PageComponent {
  @Input() set title(title: string) {
    this._titleService.setTitle(title);
  }

  constructor(private _titleService: Title) {}
}

@NgModule({
  declarations: [PageComponent],
  exports: [PageComponent],
  imports: [CommonModule],
})
export class PageModule {}
