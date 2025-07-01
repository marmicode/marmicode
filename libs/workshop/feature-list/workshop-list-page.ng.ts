import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import { workshopRouterHelper } from '@marmicode/shared/router-helpers';

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
        style="max-width: 700px; margin: auto; padding: 2rem; display: flex; flex-direction: column; gap: 2.5rem; align-items: center;"
      >
        <mat-chip-listbox>
          @for (tag of tags; track tag.value) {
            <mat-chip-option
              [selected]="selectedTag() === tag.value"
              (click)="selectTag(tag.value)"
              >{{ tag.label }}</mat-chip-option
            >
          }
        </mat-chip-listbox>

        <div>
          @for (workshop of workshops; track workshop.id) {
            <mat-card style="width: 100%; max-width: 500px; overflow: hidden;">
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
                <div style="width: 100%;">
                  <mat-chip-listbox>
                    @for (tag of nonNullTags; track tag.value) {
                      <mat-chip-option
                        [selected]="selectedTag() === tag.value"
                        (click)="selectTag(tag.value)"
                        >{{ tag.label }}</mat-chip-option
                      >
                    }
                  </mat-chip-listbox>
                </div>
                <a
                  [routerLink]="workshopRouterHelper.detail(workshop.id)"
                  mat-button
                  color="primary"
                  >View Details</a
                >
              </mat-card-content>
            </mat-card>
          }
        </div>
      </section>
    </mc-page>
  `,
})
export class WorkshopListPage {
  pageInfo = createBasicPageInfo({
    title: 'Workshops',
  });
  tags = TAGS;
  nonNullTags = TAGS.filter((tag) => tag.value !== null);
  selectedTag = signal<string | null>(null);
  workshops: Workshop[];
  workshopRouterHelper = workshopRouterHelper;

  private _repo = inject(WorkshopRepository);

  constructor() {
    this.workshops = this._repo.getWorkshops();
  }

  selectTag = (tag: string) => this.selectedTag.set(tag);
}
