import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { PageComponent } from '@marmicode/shared-ui';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Workshop } from '../../../../workshops-feature-detail/src/workshop';
import { pragmaticAngularTesting } from '../../../../workshops-feature-detail/src/workshops/pragmatic-angular-testing';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-list',
  imports: [
    PageComponent,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    TitleCasePipe,
  ],
  template: `
    <mc-page>
      <section class="content">
        <div class="tag-filter">
          <span>Filter by tag:</span>
          <mat-chip-listbox>
            @for (tag of tags(); track tag) {
              <mat-chip
                (click)="selectTag(tag)"
                clickable
                color="primary"
                [class.selected]="selectedTag() === tag"
              >
                {{ tag | titlecase }}
              </mat-chip>
            }
            <mat-chip
              (click)="selectTag(null)"
              clickable
              color="accent"
              [class.selected]="!selectedTag()"
            >
              All
            </mat-chip>
          </mat-chip-listbox>
        </div>
        <div class="workshop-cards">
          @for (workshop of filteredWorkshops(); track workshop) {
            <mat-card class="workshop-card">
              <img
                mat-card-image
                [src]="workshop.pictureUri"
                [alt]="workshop.title"
              />
              <mat-card-header>
                <mat-card-title>{{ workshop.title }}</mat-card-title>
                <mat-card-subtitle>{{ workshop.subheading }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="tags">
                  @for (tag of workshop.tags; track tag) {
                    <mat-chip>{{ tag }}</mat-chip>
                  }
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary">View Details</button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      </section>
    </mc-page>
  `,
  styles: [
    `
      .workshop-cards {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-top: 2rem;
      }
      .workshop-card {
        width: 350px;
        min-width: 300px;
        max-width: 100%;
      }
      .tag-filter {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .tags {
        margin: 0.5rem 0 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      img {
        height: 200px;
        object-fit: cover;
      }

      mat-chip.selected {
        font-weight: bold;
      }
    `,
  ],
})
export class WorkshopList {
  // In a real app, this would be fetched or injected
  private workshops: Workshop[] = [pragmaticAngularTesting];

  private _selectedTag = signal<string>('');
  selectedTag = this._selectedTag.asReadonly();
  selectTag(tag: string) {
    this._selectedTag.set(tag);
  }

  tags = computed(() => {
    const allTags = this.workshops
      .map((w) => w.tags ?? [])
      .reduce((acc, tags) => acc.concat(tags), [] as string[]);
    return Array.from(new Set(allTags));
  });

  filteredWorkshops = computed(() => {
    const tag = this.selectedTag();
    if (!tag) return this.workshops;
    return this.workshops.filter((w) => w.tags && w.tags.includes(tag));
  });

  truncate(text: string, max: number): string {
    if (!text) return '';
    return text.length > max ? text.slice(0, max) + '...' : text;
  }
}
