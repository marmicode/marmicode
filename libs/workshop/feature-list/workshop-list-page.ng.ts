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
  imports: [MatButtonModule, MatCardModule, RouterModule, PageComponent],
  template: `
    <mc-page [info]="pageInfo">
      <section
        style="max-width: 1200px; margin: auto; padding: 2rem; display: flex; flex-direction: column; gap: 2.5rem; align-items: center;"
      >
        <div
          style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: stretch; justify-content: center;"
        >
          @for (workshop of workshops; track workshop.id) {
            <mat-card
              [routerLink]="workshopRouterHelper.detail(workshop.id)"
              class="card"
              role="article"
              style="width: min(500px, 90vw); overflow: hidden;"
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
