import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { Cohort } from '@marmicode/cohort/core';
import { COHORT_LABELS } from './cohort-presentation.i18n';

/**
 * How the cohort is organized at a glance:
 * the video course first, then a live session every week, with the community in between.
 *
 * The cards are small versions of `mc-card`: a colored band with an emoji in a circle.
 *
 * It is also the program: the card of a week opens what that week covers.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-schedule',
  template: `
    <div class="schedule">
      <section class="track video-course">
        <h3 class="when">{{ schedule().videoCourse.when }}</h3>
        <div class="card">
          <span class="band">{{ schedule().videoCourse.label }}</span>
          <span class="emoji" aria-hidden="true">{{
            schedule().videoCourse.emoji
          }}</span>
          <span class="text">{{ schedule().videoCourse.description }}</span>
        </div>
      </section>

      <section class="track live-sessions">
        <h3 class="when">
          {{ schedule().liveSession.when
          }}<span class="when-detail"
            >: {{ schedule().liveSession.label }},
            {{ schedule().liveSession.duration }}</span
          >
        </h3>
        <ol class="weeks" [style.--mc-week-count]="schedule().weeks.length">
          @for (week of schedule().weeks; track $index) {
            @let number = $index + 1;
            @let selected = $index === selectedWeek();
            <li
              class="week"
              [style.--mc-week-index]="$index"
              [style.--mc-week-progress]="
                $index / (schedule().weeks.length - 1)
              "
            >
              <button
                type="button"
                class="card"
                [id]="'week-' + number"
                [class.selected]="selected"
                [attr.aria-expanded]="selected"
                [attr.aria-controls]="'week-' + number + '-program'"
                (click)="selectedWeek.set($index)"
              >
                <span class="band">{{ labels.week }} {{ number }}</span>
                <span class="emoji" aria-hidden="true">{{ week.emoji }}</span>
                <span class="text">{{ week.title }}</span>
              </button>
              <div
                class="program"
                role="region"
                [id]="'week-' + number + '-program'"
                [attr.aria-labelledby]="'week-' + number"
                [hidden]="!selected"
              >
                <h4>
                  {{ week.emoji }} {{ labels.week }} {{ number }}:
                  {{ week.title }}
                </h4>
                <ul>
                  @for (item of week.items; track $index) {
                    <li>{{ item }}</li>
                  }
                </ul>
                <p class="outcome">{{ week.outcome }}</p>
              </div>
            </li>
          }
        </ol>
      </section>

      <section class="track community">
        <h3 class="when">{{ schedule().community.when }}</h3>
        <div class="card">
          <span class="band">{{ schedule().community.label }}</span>
          <span class="emoji" aria-hidden="true">{{
            schedule().community.emoji
          }}</span>
          <span class="text">{{ schedule().community.description }}</span>
        </div>
      </section>
    </div>
  `,
  styles: `
    :host {
      /* The gradient of 'mc-card' headers, with a darker end to keep the white text readable. */
      --mc-schedule-start-color: #6a125d;
      --mc-schedule-end-color: #17847b;
      --mc-schedule-community-color: #53e0d9;

      display: block;
      padding: 0 1rem;
    }

    .schedule {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 6fr);
      gap: 1.5rem 1rem;
      max-width: 1100px;
      margin: 0 auto;
    }

    .track {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      min-width: 0;
    }

    .community {
      grid-column: 1 / -1;
    }

    .when {
      margin: 0;
      color: var(--marmicode-accent-color);
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .when-detail {
      color: #6b7280;
    }

    /*
     * Each week brings a card and its program, which takes a whole row.
     * As the flow is dense, the other cards stay together around the opened program.
     */
    .weeks {
      --mc-week-gap: 0.75rem;

      display: grid;
      grid-auto-flow: row dense;
      grid-template-columns: repeat(var(--mc-week-count), minmax(0, 1fr));
      gap: var(--mc-week-gap);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .week {
      --mc-week-color: color-mix(
        in oklab,
        var(--mc-schedule-end-color) calc(var(--mc-week-progress) * 100%),
        var(--mc-schedule-start-color)
      );

      display: contents;
    }

    .card {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      border-radius: 12px;
      background: white;
      box-shadow:
        rgba(0, 0, 0, 0.2) 0 2px 1px -1px,
        rgba(0, 0, 0, 0.14) 0 1px 1px 0,
        rgba(0, 0, 0, 0.12) 0 1px 3px 0;
      text-align: center;
    }

    button.card {
      padding: 0;
      border: none;
      cursor: pointer;
      font: inherit;
      transition: box-shadow 0.2s ease-in-out;
    }

    button.card:hover {
      box-shadow:
        rgba(0, 0, 0, 0.25) 0 3px 3px -1px,
        rgba(0, 0, 0, 0.2) 0 5px 10px 0;
    }

    button.card:focus-visible {
      outline: 2px solid var(--marmicode-accent-color);
      outline-offset: 2px;
    }

    button.card.selected {
      box-shadow:
        0 0 0 2px var(--mc-week-color),
        rgba(0, 0, 0, 0.2) 0 5px 10px 0;
    }

    /* The video course does not grow with the opened program next to it. */
    .video-course .card {
      flex: none;
    }

    .band {
      align-self: stretch;
      padding: 0.6rem 0.5rem 1.75rem;
      background: var(--mc-schedule-start-color);
      color: white;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    /* The weeks go from one end of the gradient to the other: from drift to trust. */
    .weeks .band {
      background: linear-gradient(
        135deg,
        color-mix(
          in oklab,
          var(--mc-schedule-end-color) calc(var(--mc-week-progress) * 80%),
          var(--mc-schedule-start-color)
        ),
        color-mix(
          in oklab,
          var(--mc-schedule-end-color) calc(20% + var(--mc-week-progress) * 80%),
          var(--mc-schedule-start-color)
        )
      );
    }

    .emoji {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      margin-top: -22px;
      border: 1px solid #4a7a82;
      border-radius: 50%;
      background: white;
      font-size: 1.3rem;
    }

    .text {
      padding: 0.6rem 0.75rem 1rem;
      color: var(--marmicode-primary-color);
      font-size: 0.95rem;
      font-weight: 500;
      line-height: 1.35;
      text-wrap: balance;
    }

    .program {
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

    .program[hidden] {
      display: none;
    }

    /* An arrow from the program to the card of its week. */
    .program::before {
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

    .program h4 {
      grid-column: 1 / -1;
      margin: 0;
      font-size: 1.15rem;
      font-weight: 700;
    }

    .program ul {
      display: grid;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .program li {
      position: relative;
      padding-left: 1.5em;
    }

    .program li::before {
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

    /* The community runs under everything else, as a single line. */
    .community .card {
      flex-direction: row;
      text-align: start;
    }

    .community .band {
      display: flex;
      align-items: center;
      align-self: stretch;
      padding: 0.75rem 2.25rem 0.75rem 1.25rem;
      background: var(--mc-schedule-community-color);
      color: var(--marmicode-primary-color);
    }

    .community .emoji {
      flex: none;
      margin: 0 0 0 -22px;
    }

    .community .text {
      padding: 0.75rem 1rem;
    }

    @media (max-width: 899.98px) {
      .schedule {
        grid-template-columns: minmax(0, 1fr);
      }

      .weeks {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .program {
        grid-template-columns: minmax(0, 1fr);
        margin-top: 0;
      }

      /* The cards are on several rows, so the arrow would not point to the right one. */
      .program::before {
        content: none;
      }
    }

    /* On small screens, every card becomes a line. */
    @media (max-width: 599.98px) {
      .weeks {
        --mc-week-gap: 0.5rem;

        grid-template-columns: minmax(0, 1fr);
      }

      /* The card just above already tells which week it is. */
      .program h4 {
        display: none;
      }

      .program {
        padding: 1rem;
      }

      .card {
        flex-direction: row;
        text-align: start;
      }

      .band {
        display: flex;
        flex: none;
        align-items: center;
        box-sizing: border-box;
        width: 6.5rem;
        padding: 0.75rem 1.75rem 0.75rem 0.9rem;
      }

      .community .band {
        padding: 0.75rem 1.75rem 0.75rem 0.9rem;
      }

      .emoji {
        flex: none;
        margin: 0 0 0 -22px;
      }

      .text {
        padding: 0.75rem;
      }
    }
  `,
})
export class CohortSchedule {
  schedule = input.required<Cohort['schedule']>();

  /**
   * The index of the week whose program is opened.
   */
  protected selectedWeek = signal(0);

  protected labels = COHORT_LABELS;
}
