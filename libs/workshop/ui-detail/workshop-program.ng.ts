import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Agenda, AgendaSection } from '@marmicode/training/core';
import { WorkshopLanguage } from '@marmicode/workshop/core';
import { WORKSHOP_DETAIL_LABELS } from './workshop-detail.i18n';

/**
 * Agenda as a timeline; first 8 items, then a native `<details>` "Show the full program".
 * The "👨🏻‍🏫" / "💻" title prefixes become a "Talk" / "Hands-on" marker.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-program',
  imports: [NgTemplateOutlet],
  template: `
    @let labels = this.labels();

    <div class="legend">
      <div>
        <b>{{ talkCount() }}</b> {{ labels.programTalkCount }}
      </div>
      <div>
        <b>{{ handsOnCount() }}</b> {{ labels.programHandsOnCount }}
      </div>
    </div>

    <div>
      <ng-container
        *ngTemplateOutlet="timeline; context: { $implicit: firstSteps() }"
      />
      @if (moreSteps().length > 0) {
        <details class="more">
          <summary>
            {{ labels.programShowAll }} ({{ moreSteps().length }}
            {{ labels.programMore }})
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <ng-container
            *ngTemplateOutlet="timeline; context: { $implicit: moreSteps() }"
          />
        </details>
      }
    </div>

    <ng-template #timeline let-steps>
      <ol class="timeline">
        @for (step of steps; track $index) {
          <li class="step" [class.hands-on]="step.handsOn">
            <span class="dot" aria-hidden="true">{{
              step.handsOn ? '💻' : ''
            }}</span>
            <span class="kind">{{
              step.handsOn ? labels.programHandsOn : labels.programTalk
            }}</span>
            <h3>{{ step.title }}</h3>
            @if (step.items.length > 0) {
              <ul>
                @for (item of step.items; track $index) {
                  <li>{{ item }}</li>
                }
              </ul>
            }
          </li>
        }
      </ol>
    </ng-template>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      gap: 48px;
      align-items: start;
      margin-top: 36px;
      color: var(--mc-dark-text);
    }

    @media (max-width: 900px) {
      :host {
        grid-template-columns: minmax(0, 1fr);
        gap: 24px;
      }
    }

    .legend {
      position: sticky;
      top: 150px;
      display: grid;
      gap: 12px;
      color: var(--mc-dark-muted);
      font-size: 14.5px;
    }

    .legend b {
      color: var(--mc-dark-text);
      font-size: 28px;
      letter-spacing: -0.03em;
    }

    @media (max-width: 900px) {
      .legend {
        position: static;
        grid-template-columns: repeat(2, auto);
        justify-content: start;
        gap: 16px;
      }
    }

    .timeline {
      position: relative;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .timeline::before {
      content: '';
      position: absolute;
      top: 8px;
      bottom: 8px;
      left: 15px;
      width: 2px;
      background: linear-gradient(
        to bottom,
        rgba(var(--mc-accent-rgb), 0.6),
        rgba(var(--mc-violet-rgb), 0.5) 70%,
        transparent
      );
    }

    .step {
      position: relative;
      padding: 0 0 22px 48px;
    }

    .dot {
      position: absolute;
      top: 2px;
      left: 4px;
      display: grid;
      place-items: center;
      width: 24px;
      height: 24px;
      border: 2px solid rgba(var(--mc-accent-rgb), 0.7);
      border-radius: 50%;
      background: var(--mc-dark-bg);
      font-size: 12px;
    }

    .hands-on .dot {
      background: rgba(var(--mc-accent-rgb), 0.25);
    }

    .kind {
      color: var(--mc-dark-muted);
      font-family: var(--mc-font-mono);
      font-size: 11.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .hands-on .kind {
      color: var(--mc-accent);
    }

    h3 {
      margin: 2px 0 4px;
      font-size: 17px;
      font-weight: 600;
      letter-spacing: -0.015em;
    }

    .step ul {
      margin: 0;
      padding-left: 18px;
      color: var(--mc-dark-muted);
      font-size: 14.5px;
    }

    .more summary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin: 4px 0 0 48px;
      color: var(--mc-accent);
      font-weight: 600;
      list-style: none;
      cursor: pointer;
    }

    .more summary::-webkit-details-marker {
      display: none;
    }

    .more summary:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 2px;
      border-radius: 6px;
    }

    .more[open] summary {
      display: none;
    }

    svg {
      flex: none;
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class WorkshopProgram {
  agenda = input.required<Agenda>();
  language = input.required<WorkshopLanguage>();

  protected labels = computed(() => WORKSHOP_DETAIL_LABELS[this.language()]);
  private _steps = computed(() => this.agenda().sections.map(toStep));
  protected firstSteps = computed(() =>
    this._steps().slice(0, VISIBLE_STEP_COUNT),
  );
  protected moreSteps = computed(() => this._steps().slice(VISIBLE_STEP_COUNT));
  protected handsOnCount = computed(
    () => this._steps().filter((step) => step.handsOn).length,
  );
  protected talkCount = computed(
    () => this._steps().filter((step) => !step.handsOn).length,
  );
}

const VISIBLE_STEP_COUNT = 8;

/**
 * "💻 Hands-on Exercises: First Tests" → hands-on "First Tests".
 * "👨🏻‍🏫 Vitest" → talk "Vitest".
 */
function toStep(section: AgendaSection) {
  const handsOn = section.title.startsWith('💻');
  const title = section.title
    .replace(/^(👨🏻‍🏫|💻)\s*/u, '')
    .replace(
      /^(hands-on exercises?|exercises?|exercices? pratiques?|exercices?)\s*:\s*/iu,
      '',
    );
  return {
    handsOn,
    items: section.items,
    title: title.charAt(0).toUpperCase() + title.slice(1),
  };
}
