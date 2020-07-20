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
    <article>
      <img
        [src]="resource.pictureUri"
        class="mc-resource-card-image"
        mat-card-image
        alt="Photo of a Shiba Inu"
      />
      <mc-resource-type-triangle
        [resourceType]="resource.type"
      ></mc-resource-type-triangle>

      <mat-card-header>
        <img [src]="resource.author.pictureUri" mat-card-avatar />
        <mat-card-title>
          <h2 class="mc-title">{{ resource.title }}</h2>
        </mat-card-title>
        <mat-card-subtitle fxLayout="row">
          <span class="mc-author">by {{ resource.author.name }}</span>
          <span>&nbsp;-&nbsp;</span>
          <span class="mc-duration">4 minutes read</span>
        </mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <p>
          {{ resource.summary }}
        </p>
        <section>
          <h3>Goals</h3>
          <ul>
            <li>
              SCAM: Single Component Angular Module
            </li>
            <li>
              Moduleless Angular
            </li>
          </ul>
        </section>
        <section>
          <h3>Required Skills</h3>
          <ul>
            <li>
              Angular Modules
            </li>
            <li>
              Angular Lazy Loading
            </li>
          </ul>
        </section>
      </mat-card-content>

      <mat-card-actions fxLayout="row" fxLayoutAlign="center">
        <button mat-raised-button color="primary">
          READ
        </button>
      </mat-card-actions>
    </article>
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

      /* Override h2 styling. */
      .mc-title {
        margin: 0;
        font: inherit;
      }

      .mc-author {
      }

      .mc-duration {
      }
    `,
  ],
})
export class ResourceCardComponent {
  resource = {
    author: {
      name: 'Younes Jaaidi',
      pictureUri: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    pictureUri: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    summary: `The Shiba Inu is the smallest of the six original and distinct spitz
          breeds of dog from Japan. A small, agile dog that copes very well with
          mountainous terrain, the Shiba Inu was originally bred for hunting.`,
    title: 'Your Angular Module is a SCAM!',
    type: ResourceType.BlogPost,
  };
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
