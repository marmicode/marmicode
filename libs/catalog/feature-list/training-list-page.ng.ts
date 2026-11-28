import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import { externalLinks } from '@marmicode/shared/router-helpers';
import {
  Button,
  createBasicPageInfo,
  CtaBand,
  NewsletterBand,
  PageComponent,
  PageHeader,
  SegmentedControl,
  SegmentedControlOption,
} from '@marmicode/shared/ui';
import { TODAY } from '@marmicode/shared/utils';
import { TrainingFormat, TrainingLanguage } from '@marmicode/training/core';
import {
  TRAINING_FORMAT_DESCRIPTIONS,
  TRAINING_FORMAT_EMOJIS,
  TrainingTile,
  TrainingTileData,
} from '@marmicode/training/ui';
import { WorkshopRepository } from '@marmicode/workshop/infra';
import {
  PRAGMATIC_ANGULAR_TESTING_VIDEO_COURSE,
  pickVersion,
  toTrainingOffers,
} from './catalog';

/**
 * Dark list of every training, one entry per workshop,
 * grouped by format and filtered by format and language.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-list-page',
  imports: [
    Button,
    CtaBand,
    NewsletterBand,
    PageComponent,
    PageHeader,
    SegmentedControl,
    TrainingTile,
  ],
  template: `
    <mc-page [info]="pageInfo">
      <mc-page-header
        class="wrap"
        eyebrow="// training"
        [description]="description"
      >
        Hands-on training,
        <span class="mc-gradient-text">from testing to agentic dev.</span>
      </mc-page-header>

      <div class="wrap filters">
        <mc-segmented-control
          ariaLabel="Filter by format"
          [options]="formatOptions"
          [(value)]="formatFilter"
        />
        <mc-segmented-control
          ariaLabel="Filter by language"
          [options]="languageOptions"
          [(value)]="languageFilter"
        />
        <span class="count" role="status">{{ count() }}</span>
      </div>

      <main class="wrap">
        @for (group of groups(); track group.format) {
          <section class="group">
            <header class="group-head">
              <h2>
                <span aria-hidden="true">{{ group.emoji }}</span>
                {{ group.label }}
              </h2>
              <p>{{ group.description }}</p>
            </header>
            <div
              [class.grid]="group.layout === 'card'"
              [class.stack]="group.layout === 'wide'"
            >
              @for (training of group.trainings; track training.id) {
                <mc-training-tile
                  [highlighted]="group.highlighted"
                  [layout]="group.layout"
                  [training]="training"
                />
              }
            </div>
          </section>
        } @empty {
          <div class="empty">
            <p>Nothing matches these filters yet.</p>
            <button mcButton="ghost" type="button" (click)="resetFilters()">
              Show everything
            </button>
          </div>
        }
      </main>

      <div class="wrap cta">
        <mc-cta-band
          appearance="dashed"
          heading="Need it in-house or tailored to your team?"
          linkLabel="Contact me"
          [link]="{ href: externalLinks.contactFormUrl }"
        >
          <p>Every workshop can run privately, on your codebase.</p>
        </mc-cta-band>

        <mc-newsletter-band
          class="newsletter"
          description="New workshops and session dates. No spam, just the sauce."
          heading="More workshops are on the stove."
          source="trainings"
        />
      </div>
    </mc-page>
  `,
  styles: `
    .wrap {
      display: block;
      width: min(1180px, 100% - 32px);
      margin-inline: auto;
    }

    .filters {
      position: relative;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px 16px;
      padding: 20px 0 8px;
    }

    .count {
      margin-left: auto;
      color: var(--mc-dark-muted);
      font-family: var(--mc-font-mono);
      font-size: 13px;
    }

    @media (max-width: 720px) {
      .count {
        width: 100%;
        margin-left: 0;
      }
    }

    main {
      position: relative;
      z-index: 1;
      padding-bottom: 40px;
    }

    .group {
      padding-top: 48px;
    }

    .group-head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 6px 16px;
      margin-bottom: 20px;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--mc-dark-line);

      h2 {
        margin: 0;
        font-size: 26px;
        font-weight: 600;
        letter-spacing: -0.03em;
      }

      h2 span {
        margin-right: 8px;
      }

      p {
        max-width: 70ch;
        margin: 0;
        color: var(--mc-dark-muted);
        font-size: 15px;
      }
    }

    .stack {
      display: grid;
      gap: 14px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    @media (max-width: 1000px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    .empty {
      padding: 64px 0;
      color: var(--mc-dark-muted);
      text-align: center;
    }

    .cta {
      padding: 16px 0 120px;
    }

    .newsletter {
      margin-top: 24px;
    }
  `,
})
export class TrainingListPage {
  protected readonly externalLinks = externalLinks;
  protected readonly description = `Learn in a group over a few weeks, in a live workshop, or at your own pace.
In-house sessions can be OPCO-financed.`;
  protected readonly pageInfo = createBasicPageInfo({
    title: 'Training',
    description:
      'Hands-on training, from testing to agentic dev: cohorts, live workshops and video courses.',
  });

  protected readonly formatFilter = signal<TrainingFormat | null>(null);
  protected readonly formatOptions: SegmentedControlOption<TrainingFormat | null>[] =
    [
      { value: null, label: 'All' },
      ...GROUP_FORMATS.map((format) => ({
        value: format,
        label: GROUP_LABELS.en[format],
        emoji: TRAINING_FORMAT_EMOJIS[format],
      })),
    ];

  protected readonly languageFilter = signal<TrainingLanguage | null>(null);
  protected readonly languageOptions: SegmentedControlOption<TrainingLanguage | null>[] =
    [
      { value: null, label: 'All languages' },
      { value: 'en', label: 'English', emoji: '🇬🇧' },
      { value: 'fr', label: 'Français', emoji: '🇫🇷' },
    ];

  private readonly _offers = toTrainingOffers({
    cohorts: [FROM_DRIFT_TO_TRUST_FOR_ANGULAR],
    workshops: inject(WorkshopRepository).getWorkshops(),
    videoCourses: [PRAGMATIC_ANGULAR_TESTING_VIDEO_COURSE],
    today: inject(TODAY)(),
  });

  /**
   * One group per format, in the copy of the selected language (English by default).
   * Groups with no training matching the filters are hidden.
   */
  protected readonly groups = computed(() => {
    const formatFilter = this.formatFilter();
    const language = this.languageFilter();
    const copyLanguage = language ?? 'en';
    return GROUP_FORMATS.filter(
      (format) => formatFilter == null || format === formatFilter,
    )
      .map((format) => ({
        format,
        emoji: TRAINING_FORMAT_EMOJIS[format],
        ...GROUP_LAYOUTS[format],
        label: GROUP_LABELS[copyLanguage][format],
        description: TRAINING_FORMAT_DESCRIPTIONS[copyLanguage][format],
        trainings: this._offers
          .filter((offer) => offer.format === format)
          .map((offer) => pickVersion({ offer, language }))
          .filter((training): training is TrainingTileData => training != null),
      }))
      .filter((group) => group.trainings.length > 0);
  });

  protected readonly count = computed(() => {
    const count = this.groups().reduce(
      (count, group) => count + group.trainings.length,
      0,
    );
    return `${count} ${count === 1 ? 'training' : 'trainings'}`;
  });

  protected resetFilters() {
    this.formatFilter.set(null);
    this.languageFilter.set(null);
  }
}

const GROUP_FORMATS: TrainingFormat[] = ['cohort', 'workshop', 'video-course'];

const GROUP_LAYOUTS: Record<
  TrainingFormat,
  { layout: 'card' | 'wide'; highlighted: boolean }
> = {
  cohort: { layout: 'wide', highlighted: true },
  workshop: { layout: 'card', highlighted: false },
  'video-course': { layout: 'wide', highlighted: false },
};

const GROUP_LABELS: Record<TrainingLanguage, Record<TrainingFormat, string>> = {
  en: {
    cohort: 'Cohort',
    workshop: 'Workshops',
    'video-course': 'Video course',
  },
  fr: {
    cohort: 'Cohorte',
    workshop: 'Formations',
    'video-course': 'Cours vidéo',
  },
};
