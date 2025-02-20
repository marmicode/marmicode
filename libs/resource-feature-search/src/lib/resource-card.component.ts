import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCard, MatCardImage, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { getResourceTypeActionText, getResourceTypeColor } from '@marmicode/resource-core';
import { ResourceHeaderModule } from '@marmicode/resource-ui';
import { TriangleModule } from '@marmicode/shared-ui';
import { Resource } from './resource';
import { ResourceCardActionModule, ResourceCardActionComponent } from './resource-card-action.component';
import { ResourceTypeTriangleModule, ResourceTypeTriangleComponent } from './resource-type-triangle.component';
import { SkillChipModule, SkillChipComponent } from './skill-chip.component';
import { ResourceHeaderComponent } from '../../../resource-ui/src/lib/resource-header.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'mc-resource-card',
    template: `
    <mat-card class="card">
      <article class="card-article">
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
        <mc-resource-header [resourceInfo]="resource" class="header"></mc-resource-header>

        <mat-card-content class="card-content">
          <p>
            {{ resource.summary }}
          </p>

          <!-- Skills. -->
          <section *ngIf="resource.skills?.length > 0" class="list-container">
            <h3 [style.color]="color" class="list-title">You Will Learn</h3>
            <div class="skills">
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
            <div class="skills">
              <mc-skill-chip
                *ngFor="let skill of resource.requiredSkills"
                [skill]="skill"
              ></mc-skill-chip>
            </div>
          </section>
        </mat-card-content>

        <mat-card-actions class="actions-container">
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
            display: flex;
            flex-direction: column;
            overflow: hidden;
            flex: 1;
        }

        .card-content {
            flex: 1;
        }

        .card-article {
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        .picture {
            height: 200px;
            width: 100%;
            object-fit: cover;
            /* Cancel useless margin as the resource header has a padding. */
            margin-bottom: 0;
        }

        .header {
            padding: 10px 16px;
        }

        .list-title {
            font-family: Avenir, Roboto, 'Helvetica Neue', sans-serif;
            text-transform: uppercase;
        }

        .list-container {
            margin-top: 30px;
        }

        .skills {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        .actions-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin: 10px 0;
        }
    `
    ],
    standalone: true,
    imports: [MatCard, NgIf, MatCardImage, ResourceTypeTriangleComponent, ResourceHeaderComponent, MatCardContent, NgFor, SkillChipComponent, MatCardActions, ResourceCardActionComponent]
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
    exports: [ResourceCardComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        ResourceCardActionModule,
        ResourceHeaderModule,
        ResourceTypeTriangleModule,
        SkillChipModule,
        TriangleModule,
        ResourceCardComponent
    ]
})
export class ResourceCardModule {
}
