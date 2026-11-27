import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { FROM_DRIFT_TO_TRUST_FOR_ANGULAR } from '@marmicode/cohort/core';
import { TODAY } from '@marmicode/shared/utils';
import { TrainingFormat } from '@marmicode/training/core';
import {
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
  imports: [TrainingTile],
  template: `
    @for (group of groups(); track group.format) {
      <section>
        <h2>
          <span aria-hidden="true">{{ group.emoji }}</span>
          {{ group.label }}
        </h2>
        @for (training of group.trainings; track training.id) {
          <mc-training-tile [training]="training" />
        }
      </section>
    }
  `,
})
export class TrainingListPage {
  private readonly _offers = toTrainingOffers({
    cohorts: [FROM_DRIFT_TO_TRUST_FOR_ANGULAR],
    workshops: inject(WorkshopRepository).getWorkshops(),
    videoCourses: [PRAGMATIC_ANGULAR_TESTING_VIDEO_COURSE],
    today: inject(TODAY)(),
  });

  protected readonly groups = computed(() =>
    GROUPS.map((group) => ({
      ...group,
      emoji: TRAINING_FORMAT_EMOJIS[group.format],
      trainings: this._offers
        .filter((offer) => offer.format === group.format)
        .map((offer) => pickVersion({ offer, language: null }))
        .filter((training): training is TrainingTileData => training != null),
    })),
  );
}

const GROUPS: Array<{ format: TrainingFormat; label: string }> = [
  { format: 'cohort', label: 'Cohort' },
  { format: 'workshop', label: 'Workshops' },
  { format: 'video-course', label: 'Video course' },
];
