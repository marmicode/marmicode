import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WorkshopRepository } from '@marmicode/workshop/infra';

const LANGUAGES = [
  { label: '🇬🇧 English', value: 'en' },
  { label: '🇫🇷 French', value: 'fr' },
];

const TAGS = [
  { label: 'Angular', value: 'angular' },
  { label: 'Testing', value: 'testing' },
  { label: 'All', value: null },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-list-page',
  imports: [
    MatButtonModule,
    MatCardModule,
    RouterModule,
    PageComponent,
    MatChipListbox,
    MatChipOption,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <section
        style="max-width: 1200px; margin: auto; padding: 2rem; display: flex; flex-direction: column; gap: 2.5rem; align-items: center;"
      >
        <div
          style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: center;"
        >
          @for (workshop of workshops; track workshop.id) {
            <mat-card
              [routerLink]="workshopRouterHelper.detail(workshop.id)"
              class="card"
              role="article"
              style="width: 100%; max-width: 500px; overflow: hidden;"
            >
              <img
                [src]="workshop.pictureUri"
                alt="workshop image"
                style="width: 100%; margin-bottom: 1rem;"
              />
              <mat-card-content>
                <h3
                  style="font-weight: 700; font-size: 24px; color: #111827; line-height: 1.4; margin-bottom: 0.5em;"
                >
                  {{ workshop.title }}
                </h3>
                <div
                  style="margin-bottom: 0.7em; font-size: 1.1em; color: #444;"
                >
                  {{ workshop.subheading }}
                </div>
                <div style="text-align: center;">
                  <a
                    [routerLink]="workshopRouterHelper.detail(workshop.id)"
                    mat-button
                    color="primary"
                    >VIEW DETAILS</a
                  >
                </div>
              </mat-card-content>
            </mat-card>
          }
        </div>
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
  tags = TAGS;
  languages = LANGUAGES;
  nonNullTags = TAGS.filter((tag) => tag.value !== null);
  selectedTag = signal<string | null>(null);
  workshops: Workshop[];
  workshopRouterHelper = workshopRouterHelper;

  private _repo = inject(WorkshopRepository);

  constructor() {
    this.workshops = this._repo.getWorkshops();
  }

  selectTag(tag: string, event: MouseEvent) {
    event.stopPropagation();

    this.selectedTag.set(tag);
  }
}
