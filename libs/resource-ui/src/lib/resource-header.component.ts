import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';
import { getResourceTypeColor, ResourceInfo } from '@marmicode/resource-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-header',
  template: `
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
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
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

        color: rgba(0, 0, 0, 0.87);
        letter-spacing: normal;
      }

      .title-large {
        color: #292929;
        text-rendering: optimizeLegibility;
        word-break: break-word;
        -webkit-font-smoothing: antialiased;
        font: 400 24px/32px Roboto, 'Helvetica Neue', sans-serif;
        letter-spacing: normal;
        font-size: 24px;
        font-weight: 500;
        line-height: 24px;
      }

      .subtitle {
        color: rgba(0, 0, 0, 0.54);
      }
    `,
  ],
})
export class ResourceHeaderComponent implements OnChanges {
  @Input() resourceInfo: ResourceInfo;
  color: string;

  ngOnChanges() {
    this.color = getResourceTypeColor(this.resourceInfo.type);
  }
}

@NgModule({
  declarations: [ResourceHeaderComponent],
  exports: [ResourceHeaderComponent],
  imports: [CommonModule],
})
export class ResourceHeaderModule {}
