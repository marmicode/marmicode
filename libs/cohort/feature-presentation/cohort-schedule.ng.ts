import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Cohort } from '@marmicode/cohort/core';

/**
 * How the cohort is organized at a glance:
 * a live session every week, with the video course and the community running alongside.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-schedule',
  template: `
    <div class="schedule">
      <div class="row" aria-hidden="true">
        <div class="row-label"></div>
        <div class="weeks week-labels">
          @for (week of weeks(); track week) {
            <div>W{{ week }}</div>
          }
        </div>
      </div>

      <div class="row">
        <div class="row-label">{{ schedule().liveSession.label }}</div>
        <div class="weeks">
          @for (week of weeks(); track week) {
            <div class="cell session">
              {{ schedule().liveSession.duration }}
            </div>
          }
        </div>
      </div>

      <div class="row">
        <div class="row-label">{{ schedule().videoCourse.label }}</div>
        <div class="cell track video-course">
          {{ schedule().videoCourse.description }}
        </div>
      </div>

      <div class="row">
        <div class="row-label">{{ schedule().community.label }}</div>
        <div class="cell track community">
          {{ schedule().community.description }}
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding: 0 1rem;
    }

    .schedule {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      box-sizing: border-box;
      max-width: 1000px;
      margin: 0 auto;
      padding: 1.75rem;
      border-radius: 24px;
      background: var(--marmicode-primary-color);
      color: white;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 1rem;
    }

    .row-label {
      flex: 0 0 130px;
      font-weight: 500;
    }

    .weeks {
      display: grid;
      flex: 1 1 260px;
      grid-auto-columns: minmax(0, 1fr);
      grid-auto-flow: column;
      gap: 0.5rem;
      min-width: 0;
    }

    .week-labels {
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      opacity: 0.7;
      text-align: center;
    }

    .cell {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-radius: 14px;
      font-weight: 500;
    }

    .session {
      justify-content: center;
      min-height: 72px;
      background: var(--marmicode-accent-bright-color);
      color: #00201c;
    }

    .track {
      flex: 1 1 260px;
      min-width: 0;
      min-height: 52px;
      padding: 0.5rem 1.1rem;
    }

    .video-course {
      background: #ffd7ef;
      color: var(--marmicode-primary-color);
    }

    .community {
      border: 1.5px dashed rgba(255, 255, 255, 0.6);
    }
  `,
})
export class CohortSchedule {
  schedule = input.required<Cohort['schedule']>();
  /**
   * Number of weeks the cohort lasts.
   */
  weekCount = input.required<number>();

  protected weeks = computed(() =>
    Array.from({ length: this.weekCount() }, (_, index) => index + 1),
  );
}
