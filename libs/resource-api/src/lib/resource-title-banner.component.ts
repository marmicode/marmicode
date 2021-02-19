import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  getResourceTypeColor,
  getResourceTypeText,
  ResourceType,
} from '@marmicode/resource-core';
import { WipModule } from '@marmicode/shared-utils';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-title-banner',
  template: `
    <svg preserveAspectRatio="none" viewBox="0 0 100 100">
      <polygon style="fill: #561f4b" points="0,0 20,0 10,100 0,100" />
    </svg>
    <div fxLayout="row" fxLayoutAlign="center">
      <div [style.backgroundColor]="badgeColor$ | async" class="badge">
        {{ badgeText$ | async }}
      </div>
    </div>

    <h1 class="title" [class.without-subtitle]="subtitle == null">
      {{ title }}
    </h1>

    <h2 *ngIf="subtitle" class="subtitle">
      {{ subtitle }}
    </h2>
  `,
  styles: [
    `
      :host {
        display: block;
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

      .title,
      .subtitle {
        position: relative;
        color: white;
        font-weight: 300;
        text-align: center;
        margin: 0;
      }

      .title {
        font-size: 1.2em;
      }

      /* Use more space if there is no subtitle. */
      .title.without-subtitle {
        font-size: 1.5em;
        font-weight: 350;
        margin-top: 10px;
      }

      .subtitle {
        font-size: 1.4em;
        margin-bottom: 5px;
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
export class ResourceTitleBannerComponent {
  @Input() set resourceType(resourceType: ResourceType) {
    this._state.set({ resourceType });
  }

  @Input() title: string;
  @Input() subtitle: string;

  badgeColor$ = this._state.select(
    map(({ resourceType }) => getResourceTypeColor(resourceType))
  );

  badgeText$ = this._state.select(
    map(({ resourceType }) => getResourceTypeText(resourceType))
  );

  constructor(private _state: RxState<{ resourceType: ResourceType }>) {}
}

@NgModule({
  declarations: [ResourceTitleBannerComponent],
  exports: [ResourceTitleBannerComponent],
  imports: [CommonModule, FlexLayoutModule, WipModule],
})
export class ResourceTitleBannerModule {}
