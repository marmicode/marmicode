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
import { MatIconModule } from '@angular/material/icon';
import {
  getResourceTypeActionText,
  getResourceTypeColor,
} from '@marmicode/resource-core';
import { ResourceHeaderModule } from '@marmicode/resource-ui';
import { TriangleModule } from '@marmicode/shared-ui';
import { Resource } from './resource';
import { ResourceCardActionModule } from './resource-card-action.component';
import { ResourceTypeTriangleModule } from './resource-type-triangle.component';
import { SkillChipModule } from './skill-chip.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-resource-card',
  template: ` <mat-card class="card" fxLayout="column">
    <article class="card-article" fxLayout="column">
      <!-- Resource picture. -->
      <img
        *ngIf="resource.pictureUri"
        [src]="resource.pictureUri"
        [alt]="resource.title"
        class="picture"
        mat-card-image
      />

      <!-- Resource triangle. -->
      <mc-resource-type-triangle
        [resourceType]="resource.type"
      ></mc-resource-type-triangle>

      <!-- Resource header with author info. -->
      <mc-resource-header [resourceInfo]="resource"></mc-resource-header>

      <mat-card-content fxFlex>
        <p>
          {{ resource.summary }}
        </p>

        <!-- Skills. -->
        <section *ngIf="resource.skills?.length > 0" class="list-container">
          <h3 [style.color]="color" class="list-title">You Will Learn</h3>
          <div fxLayout="row wrap">
            <mc-skill-chip
              *ngFor="let skill of resource.skills"
              [skill]="skill"
            ></mc-skill-chip>
          </div>
        </section>

        <!-- Required skills. -->
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
        <mc-resource-card-action
          [resource]="resource"
        ></mc-resource-card-action>
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
        /* Cancel useless margin as the resource header has a padding. */
        margin-bottom: 0;
      }

      .list-title {
        font-family: Avenir, Roboto, 'Helvetica Neue', sans-serif;
        text-transform: uppercase;
      }

      .list-container {
        margin-top: 30px;
      }
    `,
  ],
})
export class ResourceCardComponent implements OnChanges {
  @Input() resource: Resource;
  actionText: string;
  color: string;

  ngOnChanges() {
    this.color = getResourceTypeColor(this.resource.type);
    this.actionText = getResourceTypeActionText(this.resource.type);
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
    ResourceCardActionModule,
    ResourceHeaderModule,
    ResourceTypeTriangleModule,
    SkillChipModule,
    TriangleModule,
  ],
})
export class ResourceCardModule {}
