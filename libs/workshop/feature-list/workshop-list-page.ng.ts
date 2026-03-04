import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { WorkshopLanguage } from '@marmicode/workshop/core';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { WorkshopPreview } from '@marmicode/workshop/ui';
import { ComingSoon } from './coming-soon.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-list-page',
  imports: [
    ComingSoon,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    PageComponent,
    WorkshopPreview,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <section class="container">
        <mat-button-toggle-group
          [value]="languageFilter()"
          (change)="languageFilter.set($event.value)"
          aria-label="Filter by language"
        >
          <mat-button-toggle [value]="null">All</mat-button-toggle>
          <mat-button-toggle value="en">🇬🇧 English</mat-button-toggle>
          <mat-button-toggle value="fr">🇫🇷 French</mat-button-toggle>
        </mat-button-toggle-group>
        <div class="list">
          @for (workshop of filteredWorkshops(); track workshop.id) {
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
  filteredWorkshops = computed(() => {
    const filter = this.languageFilter();
    return filter != null
      ? this._workshops.filter((w) => w.language === filter)
      : this._workshops;
  });
  languageFilter = signal<WorkshopLanguage | null>(null);

  private _workshops = inject(WorkshopRepository).getWorkshops();
}
