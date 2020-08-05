import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import {
  ResourceType,
  getResourceTypeColor,
  getResourceTypeText,
} from '@marmicode/resource-api';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-recipe-title',
  template: ` <svg preserveAspectRatio="none" viewBox="0 0 100 100">
      <polygon style="fill: #561f4b" points="0,0 20,0 10,100 0,100" />
    </svg>
    <div fxLayout="row" fxLayoutAlign="center">
      <div [style.backgroundColor]="badgeColor$ | async" class="badge">
        {{ badgeText$ | async }}
      </div>
    </div>
    <h1 class="title">{{ title }}</h1>`,
  styles: [
    `
      :host {
        position: relative;
        background-color: #86527c;
      }

      .badge {
        position: relative;
        border-radius: 10px;
        height: 20px;
        margin-top: 10px;
        padding: 0 10px;

        color: #561f4b;
        box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2);
        text-transform: uppercase;
      }

      .title {
        position: relative;
        color: white;
        font-weight: 300;
        margin: 10px 0;
        text-align: center;
      }

      svg {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
      }
    `,
  ],
  providers: [RxState],
})
export class RecipeTitleComponent {
  @Input() set resourceType(resourceType: ResourceType) {
    this._state.set({ resourceType });
  }
  @Input() title: string;

  badgeColor$ = this._state.select(
    map(({ resourceType }) => getResourceTypeColor(resourceType))
  );

  badgeText$ = this._state.select(
    map(({ resourceType }) => getResourceTypeText(resourceType))
  );

  constructor(private _state: RxState<{ resourceType: ResourceType }>) {}
}

@NgModule({
  declarations: [RecipeTitleComponent],
  exports: [RecipeTitleComponent],
  imports: [CommonModule, FlexModule],
})
export class RecipeTitleModule {}
