import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnChanges,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ResourceType, resourceTypeColorMap } from './resource-type';
import { ResourceTypeTriangleModule } from './resource-type-triangle.component';
import { ResourceCardTriangleModule } from './triangle.component';
import { MatChipsModule } from '@angular/material/chips';

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
          <span [style.color]="color">4 minutes read</span>
        </mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <p>
          {{ resource.summary }}
        </p>
        <section class="mc-list-container">
          <h3 [style.color]="color" class="mc-list-title">Goals</h3>
          <mat-chip-list>
            <div fxLayout="row wrap">
              <mat-chip
                *ngFor="let skill of resource.skills"
                [disabled]="true"
                [style.opacity]="1"
              >
                {{ skill }}
              </mat-chip>
            </div>
          </mat-chip-list>
        </section>
        <section class="mc-list-container">
          <h3 [style.color]="color" class="mc-list-title">Required Skills</h3>
          <mat-chip-list>
            <div fxLayout="row wrap">
              <mat-chip
                *ngFor="let skill of resource.requiredSkills"
                [disabled]="true"
                [style.opacity]="1"
              >
                {{ skill }}
              </mat-chip>
            </div>
          </mat-chip-list>
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
        color: grey;
      }

      .mc-list-title {
        font-family: Avenir, Roboto, 'Helvetica Neue', sans-serif;
        text-transform: uppercase;
      }

      .mc-list-container {
        margin-top: 30px;
      }
    `,
  ],
})
export class ResourceCardComponent implements OnChanges {
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
    skills: ['Moduleless Angular', 'SCAM: Single Component Angular Module'],
    requiredSkills: ['Angular Modules', 'Angular Lazy Loading'],
  };
  color: string = resourceTypeColorMap.get(this.resource.type);

  ngOnChanges() {
    this.color = resourceTypeColorMap.get(this.resource.type);
  }
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
    MatChipsModule,
  ],
})
export class ResourceCardModule {}
