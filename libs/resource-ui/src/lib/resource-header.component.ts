import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { getResourceTypeColor, ResourceInfo } from '@marmicode/resource-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-header',
  template: `
    <div fxLayout="row" fxLayoutAlign="start center">
      <img
        *ngIf="resourceInfo.author"
        [alt]="resourceInfo.author.name"
        [src]="resourceInfo.author.pictureUri"
        class="picture"
      />
      <div>
        <h2 class="title">{{ resourceInfo.title }}</h2>
        <div class="subtitle">
          <ng-container *ngIf="resourceInfo.author">
            <span>by {{ resourceInfo.author.name }}</span>
            <span class="mc-hide mc-show-gt-xs">&nbsp;•&nbsp;</span>
            <br class="mc-hide-gt-xs" />
          </ng-container>
          <ng-container *ngIf="resourceInfo.releasedAt">
            <span>{{ resourceInfo.releasedAt | date }}</span>
            <span>&nbsp;•&nbsp;</span>
          </ng-container>
          <span [style.color]="color">{{ resourceInfo.duration }} minutes</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 10px 0;
      }

      .picture {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        margin-right: 10px;
      }

      /* Override h2 styling. */
      .title {
        margin: 0;
        font-size: 1.2em;
        line-height: 1.2em;

        color: #292929;
        letter-spacing: normal;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
      }

      .subtitle {
        color: rgba(0, 0, 0, 0.54);
      }

      :host.large {
        padding-left: 5px;
        padding-right: 5px;
      }

      :host.large .picture {
        height: 70px;
        width: 70px;
      }

      @media screen and (min-width: 960px) {
        :host.large .title {
          font-size: 2em;
        }

        :host.large .subtitle {
          font-size: 1.2em;
        }
      }
    `,
  ],
})
export class ResourceHeaderComponent implements OnChanges {
  @Input() resourceInfo: ResourceInfo;
  @Input() mode: 'small' | 'large' = 'small';
  @HostBinding('class.large') get isLarge() {
    return this.mode === 'large';
  }
  color: string;

  ngOnChanges() {
    this.color = getResourceTypeColor(this.resourceInfo.type);
  }
}

@NgModule({
  declarations: [ResourceHeaderComponent],
  exports: [ResourceHeaderComponent],
  imports: [CommonModule, FlexModule],
})
export class ResourceHeaderModule {}
