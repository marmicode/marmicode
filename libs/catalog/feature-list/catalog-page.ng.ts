import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import { createBasicPageInfo, PageComponent } from '@marmicode/shared/ui';
import { TrainingFormat, TrainingLanguage } from '@marmicode/training/core';
import {
  TRAINING_FORMAT_EMOJIS,
  TRAINING_FORMAT_LABELS,
  TrainingPreview,
  TrainingPreviewData,
} from '@marmicode/training/ui';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import {
  cohortToPreview,
  PRAGMATIC_ANGULAR_TESTING_VIDEO_COURSE,
  workshopToPreview,
} from './catalog';
import { ComingSoon } from './coming-soon.ng';
import { FormatInfo } from './format-info.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-catalog-page',
  imports: [
    ComingSoon,
    FormatInfo,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    PageComponent,
    TrainingPreview,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <section class="container">
        <div class="filters">
          <mat-button-toggle-group
            [(ngModel)]="languageFilter"
            [hideSingleSelectionIndicator]="true"
            aria-label="Filter by language"
          >
            @for (option of languageOptions; track option.value) {
              <mat-button-toggle [value]="option.value">
                {{ option.label }}
              </mat-button-toggle>
            }
          </mat-button-toggle-group>

          <div class="format-filter">
            <mat-button-toggle-group
              [(ngModel)]="formatFilter"
              [hideSingleSelectionIndicator]="true"
              aria-label="Filter by format"
            >
              @for (option of formatOptions; track option.value) {
                <mat-button-toggle [value]="option.value">
                  @if (option.emoji) {
                    <span class="toggle-emoji" aria-hidden="true">{{
                      option.emoji
                    }}</span>
                  }
                  {{ option.label }}
                </mat-button-toggle>
              }
            </mat-button-toggle-group>
            <mc-format-info [language]="formatInfoLanguage()" />
          </div>
        </div>

        @for (group of groups(); track group.format) {
          <section
            class="group"
            [attr.aria-labelledby]="group.format + '-heading'"
          >
            <h2 class="group-heading" [id]="group.format + '-heading'">
              <span aria-hidden="true">{{ group.emoji }}</span>
              {{ group.heading }}
            </h2>
            <div class="list">
              @for (training of group.trainings; track training.id) {
                <mc-training-preview class="item" [training]="training" />
              }
            </div>
          </section>
        } @empty {
          <div role="status" class="empty">
            <p>Nothing matches these filters yet.</p>
            <button matButton="outlined" type="button" (click)="resetFilters()">
              SHOW EVERYTHING
            </button>
          </div>
        }

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

    .filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 1rem 2.5rem;
    }

    .format-filter {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .toggle-emoji {
      margin-right: 0.25em;
    }

    @media (max-width: 599px) {
      .container {
        padding: 2rem 1rem;
      }
    }

    /* The format toggles do not fit on phones with the emojis. */
    @media (max-width: 420px) {
      .toggle-emoji {
        display: none;
      }
    }

    .group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%;
    }

    .group-heading {
      display: flex;
      gap: 0.4em;
      margin: 0;
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--marmicode-primary-color);
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

    .empty {
      text-align: center;
      font-size: 1.1em;
      color: #444;
    }
  `,
})
/**
 * Lists every training: workshops, cohorts and video courses.
 */
export class CatalogPage {
  pageInfo = createBasicPageInfo({
    title: 'Workshops',
  });

  languageFilter = signal<TrainingLanguage | null>(null);
  languageOptions: Array<{ label: string; value: TrainingLanguage | null }> = [
    { label: 'All', value: null },
    { label: '🇬🇧 English', value: 'en' },
    { label: '🇫🇷 French', value: 'fr' },
  ];

  formatFilter = signal<TrainingFormat | null>(null);

  formatOptions: Array<{
    emoji?: string;
    label: string;
    value: TrainingFormat | null;
  }> = [
    { label: 'All', value: null },
    ...(['video-course', 'cohort', 'workshop'] as const).map((format) => ({
      emoji: TRAINING_FORMAT_EMOJIS[format],
      label: TRAINING_FORMAT_LABELS.en[format],
      value: format,
    })),
  ];

  /**
   * The format filter stays in English, but the bubble that explains
   * the formats follows the selected language.
   */
  formatInfoLanguage = computed(() => this.languageFilter() ?? 'en');

  /**
   * One group per format, so different formats never share a row.
   * Groups with no training matching the filters are hidden.
   */
  groups = computed(() => {
    const language = this.languageFilter();
    const format = this.formatFilter();
    return GROUPS.filter((group) => format == null || group.format === format)
      .map((group) => ({
        ...group,
        emoji: TRAINING_FORMAT_EMOJIS[group.format],
        trainings: this._trainings.filter(
          (training) =>
            training.format === group.format &&
            (language == null || training.language === language),
        ),
      }))
      .filter((group) => group.trainings.length > 0);
  });

  private _trainings: TrainingPreviewData[] = [
    cohortToPreview(FROM_DRIFT_TO_TRUST_FOR_ANGULAR),
    ...inject(WorkshopRepository).getWorkshops().map(workshopToPreview),
    PRAGMATIC_ANGULAR_TESTING_VIDEO_COURSE,
  ];

  resetFilters() {
    this.languageFilter.set(null);
    this.formatFilter.set(null);
  }
}

const GROUPS: Array<{ format: TrainingFormat; heading: string }> = [
  { format: 'cohort', heading: 'Cohort' },
  { format: 'workshop', heading: 'Workshops' },
  { format: 'video-course', heading: 'Video course' },
];
