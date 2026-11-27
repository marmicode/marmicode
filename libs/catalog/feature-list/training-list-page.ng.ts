import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import { SegmentedControl, SegmentedControlOption } from '@marmicode/shared/ui';
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
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-list-page',
  imports: [SegmentedControl, TrainingTile],
  template: `
    <mc-segmented-control
      ariaLabel="Filter by language"
      [options]="languageOptions"
      [(value)]="languageFilter"
    />

    @for (group of groups(); track group.format) {
      <section>
        <header>
          <h2>
            <span aria-hidden="true">{{ group.emoji }}</span>
            {{ group.label }}
          </h2>
          <p>{{ group.description }}</p>
        </header>
        @for (training of group.trainings; track training.id) {
          <mc-training-tile [training]="training" />
        }
      </section>
    }
  `,
})
export class TrainingListPage {
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
    const language = this.languageFilter();
    const copyLanguage = language ?? 'en';
    return GROUP_FORMATS.map((format) => ({
      format,
      emoji: TRAINING_FORMAT_EMOJIS[format],
      label: GROUP_LABELS[copyLanguage][format],
      description: TRAINING_FORMAT_DESCRIPTIONS[copyLanguage][format],
      trainings: this._offers
        .filter((offer) => offer.format === format)
        .map((offer) => pickVersion({ offer, language }))
        .filter((training): training is TrainingTileData => training != null),
    })).filter((group) => group.trainings.length > 0);
  });
}

const GROUP_FORMATS: TrainingFormat[] = ['cohort', 'workshop', 'video-course'];

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
