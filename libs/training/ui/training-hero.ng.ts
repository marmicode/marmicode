import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Training } from '@marmicode/training/core';
import { Hero } from '@marmicode/shared/ui';
import { formatOffer } from './format-offer';
import { TrainingAction } from './training-action.ng';
import { TRAINING_LABELS } from './training.i18n';

/**
 * The banner of a training: title, offer, subheading and "Join Waitlist" action.
 *
 * What differs between trainings is projected in named slots:
 * - `subtitle`: under the title, e.g. the duration
 * - `status`: above the actions, e.g. `<mc-training-hero-pill slot="status" />`
 * - `actions`: more actions, e.g. `<mc-training-action slot="actions" />`
 * - `note`: under the actions
 * - `footer`: at the bottom of the banner
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-hero',
  imports: [Hero, TrainingAction],
  template: `
    <mc-hero [pictureUri]="training().pictureUri" [title]="training().title">
      <ng-container slot="subtitle">
        <ng-content select="[slot='subtitle']" />
      </ng-container>

      <ng-container slot="content">
        <p class="badge">{{ offerLabel() }}</p>
        <p class="subheading">
          @for (line of subheadingLines(); track line) {
            <span>{{ line }}</span>
          }
        </p>

        <div class="actions-container">
          <ng-content select="[slot='status']" />

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

          <ng-content select="[slot='note']" />
        </div>

        <ng-content select="[slot='footer']" />
      </ng-container>
    </mc-hero>
  `,
  styles: `
    :host {
      display: block;
      position: relative;

      @media (max-width: 599.98px) {
        font-size: 0.75rem;
      }
    }

    .badge {
      padding: 0.5rem 1rem;
      margin: 1.5rem 0;
      border-radius: 20px;
      margin-bottom: 0.7rem;

      background: rgba(56, 0, 48, 0.6);
      font-size: 1.3em;
      box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
    }

    .subheading {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      margin-bottom: 2rem;

      font-size: 1.5em;
      line-height: 1.5;
      text-wrap: var(--mc-training-hero-subheading-text-wrap, wrap);
    }

    .actions-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;

      @media (max-width: 599.98px) {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `,
})
export class TrainingHero {
  training = input.required<Training>();

  protected labels = computed(() => TRAINING_LABELS[this.training().language]);
  protected offerLabel = computed(() =>
    formatOffer({
      offer: this.training().offer,
      locale: this.training().language,
    }),
  );
  protected subheadingLines = computed(() =>
    this.training().subheading.split('\n'),
  );
}
