import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Cohort } from '@marmicode/cohort/core';
import { COHORT_LABELS } from './cohort-presentation.i18n';

/**
 * What a week of the cohort covers, opened under the cards of the schedule.
 *
 * It takes a whole row of the schedule's grid, and reads the week's color and position
 * from the custom properties that the schedule sets on it.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-week-program',
  host: {
    role: 'region',
  },
  template: `
    <h4>
      {{ week().emoji }} {{ labels.week }} {{ number() }}:
      {{ week().title }}
    </h4>
    <ul>
      @for (item of week().items; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
    <p class="outcome">{{ week().outcome }}</p>
  `,
  styles: `
    :host {
      display: grid;
      position: relative;
      grid-column: 1 / -1;
      grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
      gap: 0.75rem 2rem;
      align-items: start;
      margin-top: 0.5rem;
      padding: 1.25rem 1.5rem 1.5rem;
      border-top: 4px solid var(--mc-week-color);
      border-radius: 12px;
      background: white;
      box-shadow:
        rgba(0, 0, 0, 0.2) 0 2px 1px -1px,
        rgba(0, 0, 0, 0.14) 0 1px 1px 0,
        rgba(0, 0, 0, 0.12) 0 1px 3px 0;
      color: var(--marmicode-primary-color);
      line-height: 1.5;
    }

    :host([hidden]) {
      display: none;
    }

    /* An arrow from the program to the card of its week. */
    :host::before {
      position: absolute;
      top: -20px;
      left: calc(
        (var(--mc-week-index) + 0.5) * (100% + var(--mc-week-gap)) /
          var(--mc-week-count) - var(--mc-week-gap) / 2
      );
      transform: translateX(-50%);
      border: 8px solid transparent;
      border-bottom-color: var(--mc-week-color);
      content: '';
    }

    h4 {
      grid-column: 1 / -1;
      margin: 0;
      font-size: 1.15rem;
      font-weight: 700;
    }

    ul {
      display: grid;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      position: relative;
      padding-left: 1.5em;
    }

    li::before {
      position: absolute;
      left: 0;
      color: var(--marmicode-accent-color);
      content: '→';
    }

    .outcome {
      margin: 0;
      padding: 0.75rem 1rem;
      border-left: 4px solid var(--marmicode-accent-color);
      border-radius: 4px 10px 10px 4px;
      background: color-mix(
        in srgb,
        var(--marmicode-accent-bright-color) 35%,
        white
      );
      font-weight: 500;
    }

    @media (max-width: 899.98px) {
      :host {
        grid-template-columns: minmax(0, 1fr);
        margin-top: 0;
      }

      /* The cards are on several rows, so the arrow would not point to the right one. */
      :host::before {
        content: none;
      }
    }

    @media (max-width: 599.98px) {
      :host {
        padding: 1rem;
      }

      /* The card just above already tells which week it is. */
      h4 {
        display: none;
      }
    }
  `,
})
export class CohortWeekProgram {
  week = input.required<Cohort['schedule']['weeks'][number]>();
  number = input.required<number>();

  protected labels = COHORT_LABELS;
}
