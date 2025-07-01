import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { Workshop } from '@marmicode/workshop/core';
import { WorkshopRepository } from '@marmicode/workshop/infra';

const TAGS = [
  { label: 'Angular', value: 'angular' },
  { label: 'Testing', value: 'testing' },
  { label: 'All', value: 'all' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-list-page',
  imports: [MatButtonModule, MatCardModule, RouterModule, PageComponent],
  template: `
    <mc-page [info]="pageInfo">
      <section style="max-width: 700px; padding: 2rem auto;">
        <div
          style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; flex-wrap:"
        >
          <span style="font-size: 1.1em; font-weight: 500;"
            >Filter by tag:</span
          >
          @for (tag of tags(); track tag.value) {
            <span
              (click)="selectTag(tag.value)"
              [style.background]="
                selectedTag() === tag.value ? '#e0e0e0' : '#f5f5f5'
              "
              style="display: inline-block; padding: 0.5em 1.2em; border-radius: 999px; margin-right: 0.5em; font-size: 1.1em; min-width: 80px; cursor: pointer; font-weight: 500; border: 1px solid #ccc; user-select: none;"
              >{{ tag.label }}</span
            >
          }
        </div>
        <div
          style="display: flex; flex-direction: column; gap: 2.5rem; align-items: center;"
        >
          @if (filteredWorkshops().length > 0) {
            @for (workshop of filteredWorkshops(); track workshop.id) {
              <mat-card
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
                  <div style="margin-bottom: 1em;">
                    <span
                      style="display: inline-block; padding: 0.3em 1em; border-radius: 999px; background: #f5f5f5; margin-right: 0.5em; font-size: 1em;"
                      >angular</span
                    >
                    <span
                      style="display: inline-block; padding: 0.3em 1em; border-radius: 999px; background: #f5f5f5; font-size: 1em;"
                      >testing</span
                    >
                  </div>
                  <a
                    [routerLink]="['/workshops', workshop.id]"
                    style="color: #7b1fa2; font-weight: 600; text-decoration: none; font-size: 1.1em; letter-spacing: 0.5px;"
                    >View Details</a
                  >
                </mat-card-content>
              </mat-card>
            }
          } @else {
            <p style="font-size: 1.2em; color: #888;">No workshops found.</p>
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

  tags = signal(TAGS);
  selectedTag = signal('all');
  workshops: Workshop[];

  private _repo = inject(WorkshopRepository);

  constructor() {
    this.workshops = this._repo.getWorkshops();
  }

  filteredWorkshops = computed(() => {
    const tag = this.selectedTag();
    if (tag === 'all') {
      return this.workshops;
    }
    // For now, all workshops are tagged as both 'angular' and 'testing'.
    return this.workshops.filter(() => tag === 'angular' || tag === 'testing');
  });

  selectTag = (tag: string) => this.selectedTag.set(tag);
}
