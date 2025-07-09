import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { WorkshopPreview } from '@marmicode/workshop/ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-list-page',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    PageComponent,
    WorkshopPreview,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <section
        style="max-width: 1200px; margin: auto; padding: 2rem; display: flex; flex-direction: column; gap: 2.5rem; align-items: center;"
      >
        <div
          style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: stretch; justify-content: center;"
        >
          @for (workshop of workshops; track workshop.id) {
            <mc-workshop-preview [workshop]="workshop" />
          }
        </div>
        <mat-card
          role="article"
          style="width: min(500px, 90vw); overflow: hidden; opacity: 0.85; border: 2px dashed #1976d2; background: #f5faff;"
        >
          <mat-card-content
            style="display: flex; flex-direction: column; align-items: center; justify-content: space-around; min-height: 300px;"
          >
            <h3
              style="font-weight: 700; font-size: 24px; color: #1976d2; margin-bottom: 1em; text-align: center;"
            >
              More Workshops Coming Soon!
            </h3>
            <ul
              style="padding: 0; margin: 0 0 1em 0; text-align: left; color: #333; font-size: 1.1em;"
            >
              <li>AI-Assisted TDD</li>
              <li>Modern Angular</li>
              <li>Architecture</li>
              <li>Nx</li>
              <li>NestJS</li>
              <li>...</li>
            </ul>
            <div style="color: #666; font-size: 1em; text-align: center;">
              Stay tuned for updates and new workshop announcements!
            </div>
          </mat-card-content>
        </mat-card>
      </section>
    </mc-page>
  `,
  styles: `
    .card {
      cursor: pointer;
    }
  `,
})
export class WorkshopListPage {
  pageInfo = createBasicPageInfo({
    title: 'Workshops',
  });
  workshops = inject(WorkshopRepository).getWorkshops();
  workshopRouterHelper = workshopRouterHelper;
}
