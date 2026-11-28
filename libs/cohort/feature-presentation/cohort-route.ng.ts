import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Cohort } from '@marmicode/cohort/core';
import { COHORT_LABELS } from './cohort-presentation.i18n';

/**
 * Vertical route of the weeks: number, emoji, title, items, and the `outcome` as "You leave with…".
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-route',
  template: `
    <ol class="route">
      @for (week of routeWeeks(); track $index) {
        <li class="stop" [id]="'week-' + ($index + 1)">
          <span class="node" aria-hidden="true">{{ week.emoji }}</span>
          <div class="card mc-surface">
            <span class="number">{{ labels.week }} {{ $index + 1 }}</span>
            <h3>{{ week.title }}</h3>
            <ul>
              @for (item of week.items; track $index) {
                <li>{{ item }}</li>
              }
            </ul>
            <p class="outcome">
              @if (week.outcomeRest !== undefined) {
                <b>{{ labels.youLeaveWith }}</b> {{ week.outcomeRest }}
              } @else {
                {{ week.outcome }}
              }
            </p>
          </div>
        </li>
      }
    </ol>
  `,
  styles: `
    :host {
      display: block;
    }

    .route {
      position: relative;
      max-width: 920px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    /* The line that links the weeks. */
    .route::before {
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 27px;
      width: 2px;
      background: linear-gradient(
        to bottom,
        rgba(var(--mc-violet-rgb), 0.7),
        rgba(var(--mc-accent-rgb), 0.8)
      );
      content: '';
      opacity: 0.55;
    }

    .stop {
      position: relative;
      display: grid;
      grid-template-columns: 56px minmax(0, 1fr);
      gap: 20px;
      padding: 10px 0;
      scroll-margin-top: 110px;
    }

    .node {
      position: relative;
      z-index: 1;
      display: grid;
      place-items: center;
      width: 56px;
      height: 56px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.5);
      border-radius: 16px;
      background: var(--mc-dark-surface);
      box-shadow: 0 0 0 5px var(--mc-dark-bg);
      font-size: 24px;
    }

    .card {
      padding: 22px 24px;
    }

    .number {
      display: block;
      margin-bottom: 10px;
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
      font-size: 12.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    h3 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    ul {
      display: grid;
      gap: 6px;
      margin: 12px 0 0;
      padding: 0 0 0 18px;
      color: var(--mc-dark-muted);
      font-size: 15px;
    }

    ul li::marker {
      color: rgba(var(--mc-accent-rgb), 0.9);
    }

    .outcome {
      margin: 16px 0 0;
      padding: 12px 14px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.25);
      border-radius: 12px;
      background: rgba(var(--mc-accent-rgb), 0.08);
      font-size: 14.5px;
    }

    .outcome b {
      color: var(--mc-accent-bright);
      font-weight: 600;
    }

    @media (max-width: 600px) {
      .route::before {
        left: 21px;
      }

      .stop {
        grid-template-columns: 44px minmax(0, 1fr);
        gap: 14px;
      }

      .node {
        width: 44px;
        height: 44px;
        border-radius: 13px;
        font-size: 20px;
      }

      .card {
        padding: 18px;
      }

      h3 {
        font-size: 19px;
      }
    }
  `,
})
export class CohortRoute {
  weeks = input.required<Cohort['schedule']['weeks']>();

  protected labels = COHORT_LABELS;
  /* "You leave with a design doc." → bold "You leave with" + "a design doc.". */
  protected routeWeeks = computed(() =>
    this.weeks().map((week) => {
      const prefix = `${this.labels.youLeaveWith} `;
      return {
        ...week,
        outcomeRest: week.outcome.startsWith(prefix)
          ? week.outcome.slice(prefix.length)
          : undefined,
      };
    }),
  );
}
