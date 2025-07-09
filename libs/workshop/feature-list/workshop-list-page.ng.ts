import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { WorkshopPreview } from '@marmicode/workshop/ui';
import { ComingSoon } from './coming-soon.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-list-page',
  imports: [
    ComingSoon,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    PageComponent,
    WorkshopPreview,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <section class="container">
        <div class="list">
          @for (workshop of workshops; track workshop.id) {
            <mc-workshop-preview class="item" [workshop]="workshop" />
          }
        </div>
        <mc-coming-soon class="item" />
      </section>
    </mc-page>
  `,
  styles: `
    .container {
      max-width: 1200px;
      margin: auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      align-items: center;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: stretch;
      justify-content: center;
    }

    .item {
      width: min(500px, 90vw);
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
