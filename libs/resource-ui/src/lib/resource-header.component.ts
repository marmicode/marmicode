import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { getResourceTypeColor, ResourceInfo } from '@marmicode/resource-core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-header',
  template: ` <mat-card-header *ngIf="resourceInfo">
    <img
      *ngIf="resourceInfo.author"
      [alt]="resourceInfo.author.name"
      [src]="resourceInfo.author.pictureUri"
      mat-card-avatar
    />
    <mat-card-title>
      <h2 class="title">{{ resourceInfo.title }}</h2>
    </mat-card-title>
    <mat-card-subtitle class="card-subtitle">
      <ng-container *ngIf="resourceInfo.author">
        <span>by {{ resourceInfo.author.name }}</span>
        <span>&nbsp;•&nbsp;</span>
      </ng-container>
      <ng-container *ngIf="resourceInfo.releasedAt">
        <span>{{ resourceInfo.releasedAt | date }}</span>
        <span>&nbsp;•&nbsp;</span>
      </ng-container>
      <span [style.color]="color">{{ resourceInfo.duration }} minutes</span>
    </mat-card-subtitle>
  </mat-card-header>`,
  styles: [
    `
      /* Override h2 styling. */
      .title {
        margin: 0;
        font: inherit;
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
  imports: [CommonModule, MatCardModule],
})
export class ResourceHeaderModule {}
