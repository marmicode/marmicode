import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ResourceType } from './resource-type';
import { ResourceTypeTriangleModule } from './resource-type-triangle.component';
import { ResourceCardTriangleModule } from './triangle.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-card',
  template: ` <mat-card class="mc-resource-card">
    <img
      class="mc-resource-card-image"
      mat-card-image
      src="https://material.angular.io/assets/img/examples/shiba2.jpg"
      alt="Photo of a Shiba Inu"
    />
    <mc-resource-type-triangle
      [resourceType]="resourceType"
    ></mc-resource-type-triangle>

    <mat-card-header>
      <img
        src="https://material.angular.io/assets/img/examples/shiba2.jpg"
        mat-card-avatar
      />
      <mat-card-title>Your Angular Module is a SCAM!</mat-card-title>
      <mat-card-subtitle fxLayout="row">
        <span class="mc-author">by Younes Jaaidi</span>
        <span>&nbsp;-&nbsp;</span>
        <span class="mc-duration">4 minutes read</span>
      </mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <p>
        The Shiba Inu is the smallest of the six original and distinct spitz
        breeds of dog from Japan. A small, agile dog that copes very well with
        mountainous terrain, the Shiba Inu was originally bred for hunting.
      </p>
    </mat-card-content>

    <mat-card-actions fxLayout="row" fxLayoutAlign="center">
      <button mat-raised-button color="primary">
        READ
      </button>
    </mat-card-actions>
  </mat-card>`,
  styles: [
    `
      :host {
        display: block;
        width: 600px;
      }

      .mc-resource-card {
        overflow: hidden;
      }

      .mc-resource-card-image {
        height: 200px;
        object-fit: cover;
      }

      .mc-author {
      }

      .mc-duration {
      }
    `,
  ],
})
export class ResourceCardComponent {
  resourceType = ResourceType.BlogPost;
}

@NgModule({
  declarations: [ResourceCardComponent],
  exports: [ResourceCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    ResourceCardTriangleModule,
    ResourceTypeTriangleModule,
    MatIconModule,
  ],
})
export class ResourceCardModule {}
