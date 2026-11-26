import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Training } from '@marmicode/training/core';
import { TrainingAction } from './training-action.ng';
import { TRAINING_LABELS } from './training.i18n';

/**
 * The closing band of a training's page, with a "Join Waitlist" action.
 *
 * It shows the training's own call to action if there is one,
 * otherwise a default title and the training's subheading.
 *
 * More actions can be projected in the `actions` slot,
 * e.g. `<mc-training-action slot="actions" />`.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-call-to-action',
  imports: [TrainingAction],
  template: `
    <section class="cta">
      <h2>{{ title() }}</h2>
      <p class="description">{{ description() }}</p>
      <div class="actions">
        @if (training().waitlist; as waitlist) {
          <mc-training-action
            icon="notifications"
            [href]="waitlist.url"
            [label]="labels().joinWaitlist"
          />
        }
        <ng-content select="[slot='actions']" />
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .cta {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 5rem 2rem;
      background: var(--marmicode-primary-color);
      color: white;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.3;
      margin: 0 0 1.5rem;
      max-width: 800px;
    }

    .description {
      font-size: 1.2em;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 0 2rem;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;

      @media (max-width: 599.98px) {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `,
})
export class TrainingCallToAction {
  training = input.required<Training>();

  protected description = computed(
    () =>
      this.training().callToAction?.description ??
      this.training().subheading.replaceAll('\n', ' '),
  );
  protected labels = computed(() => TRAINING_LABELS[this.training().language]);
  protected title = computed(
    () =>
      this.training().callToAction?.title ?? this.labels().callToActionTitle,
  );
}
