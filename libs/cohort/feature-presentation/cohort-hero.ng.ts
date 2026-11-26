import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Cohort } from '@marmicode/cohort/core';
import { TrainingHero, TrainingHeroPill } from '@marmicode/training/ui';
import { COHORT_LABELS } from './cohort-presentation.i18n';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-hero',
  imports: [TrainingHero, TrainingHeroPill],
  template: `
    <mc-training-hero [training]="cohort()">
      <mc-training-hero-pill
        slot="status"
        [segments]="[labels.nextCohort, cohort().nextCohort]"
      />

      @if (cohort().waitlist) {
        <p slot="note" class="actions-note">{{ labels.waitlistNote }}</p>
      }

      <p slot="footer" class="bottom-note">{{ labels.frenchNote }}</p>
    </mc-training-hero>
  `,
  styles: `
    :host {
      /* Avoids leaving a single word on its own line on narrow screens. */
      --mc-training-hero-subheading-text-wrap: balance;

      display: block;
      position: relative;
    }

    .actions-note {
      margin: 1rem 1rem 0;
    }

    .bottom-note {
      color: white;
      font-size: 1.3rem;
      text-align: center;
      margin: 0 1rem 2rem;
    }
  `,
})
export class CohortHero {
  cohort = input.required<Cohort>();

  protected labels = COHORT_LABELS;
}
