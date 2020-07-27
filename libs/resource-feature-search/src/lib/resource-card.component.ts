import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TriangleModule } from '@marmicode/shared-ui';
import { Resource } from './resource';
import { resourceTypeActionMap, resourceTypeColorMap } from './resource-type';
import { ResourceTypeTriangleModule } from './resource-type-triangle.component';
import { SkillChipModule } from './skill-chip.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-card',
  template: ` <mat-card class="card" fxLayout="column">
    <article class="card-article" fxLayout="column">
      <img
        *ngIf="resource.pictureUri"
        [src]="resource.pictureUri"
        [alt]="resource.title"
        class="picture"
        mat-card-image
      />
      <mc-resource-type-triangle
        [resourceType]="resource.type"
      ></mc-resource-type-triangle>

      <mat-card-header>
        <img
          *ngIf="resource.author"
          [src]="resource.author.pictureUri"
          mat-card-avatar
        />
        <mat-card-title>
          <h2 class="title">{{ resource.title }}</h2>
        </mat-card-title>
        <mat-card-subtitle fxLayout="row">
          <ng-container *ngIf="resource.author">
            <span class="author">by {{ resource.author.name }}</span>
            <span>&nbsp;-&nbsp;</span>
          </ng-container>
          <span [style.color]="color">{{ resource.duration }} minutes</span>
        </mat-card-subtitle>
      </mat-card-header>

      <mat-card-content fxFlex>
        <p>
          {{ resource.summary }}
        </p>
        <section class="list-container">
          <h3 [style.color]="color" class="list-title">Goals</h3>
          <div fxLayout="row wrap">
            <mc-skill-chip
              *ngFor="let skill of resource.skills"
              [skill]="skill"
            ></mc-skill-chip>
          </div>
        </section>
        <section
          *ngIf="resource.requiredSkills?.length > 0"
          class="list-container"
        >
          <h3 [style.color]="color" class="list-title">Required Skills</h3>
          <div fxLayout="row wrap">
            <mc-skill-chip
              *ngFor="let skill of resource.requiredSkills"
              [skill]="skill"
            ></mc-skill-chip>
          </div>
        </section>
      </mat-card-content>

      <mat-card-actions fxLayout="row" fxLayoutAlign="center">
        <a [href]="resource.url" target="_blank">
          <button
            [style.backgroundColor]="color"
            class="action-button"
            mat-raised-button
            color="primary"
          >
            {{ actionText }}
          </button>
        </a>
      </mat-card-actions>
    </article>
  </mat-card>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        width: 550px;
      }

      .card {
        overflow: hidden;
        flex: 1;
      }

      .card-article {
        flex: 1;
      }

      .picture {
        height: 200px;
        object-fit: cover;
      }

      /* Override h2 styling. */
      .title {
        margin: 0;
        font: inherit;
      }

      .author {
        color: grey;
      }

      .list-title {
        font-family: Avenir, Roboto, 'Helvetica Neue', sans-serif;
        text-transform: uppercase;
      }

      .list-container {
        margin-top: 30px;
      }

      .action-button {
        font-size: 1.1em;
        min-width: 130px;
        text-transform: uppercase;
      }
    `,
  ],
})
export class ResourceCardComponent implements OnChanges {
  @Input() resource: Resource;
  actionText: string;
  color: string;

  ngOnChanges() {
    this.color = resourceTypeColorMap.get(this.resource.type);
    this.actionText = resourceTypeActionMap.get(this.resource.type);
  }
}

@NgModule({
  declarations: [ResourceCardComponent],
  exports: [ResourceCardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ResourceTypeTriangleModule,
    SkillChipModule,
    TriangleModule,
  ],
})
export class ResourceCardModule {}
