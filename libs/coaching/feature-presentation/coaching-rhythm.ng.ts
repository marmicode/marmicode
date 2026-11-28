import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CoachingOffering } from '@marmicode/coaching/core';
import { COACHING_LABELS } from './coaching-presentation.i18n';

/**
 * Philosophy title + text next to the monthly loop: deep-dive → async support → written report → repeat.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coaching-rhythm',
  template: `
    <div class="copy">
      <span class="mc-eyebrow">// {{ labels.rhythmEyebrow }}</span>
      <h2>
        {{ title().start }}
        <span class="mc-gradient-text">{{ title().end }}</span>
      </h2>
      @for (paragraph of paragraphs(); track $index) {
        <p>{{ paragraph }}</p>
      }
    </div>

    <div class="loop" role="group" [attr.aria-label]="labels.loopEyebrow">
      <span class="mc-eyebrow">// {{ labels.loopEyebrow }}</span>
      <ol>
        @for (step of labels.loopSteps; track step.title) {
          <li>
            <span class="dot" aria-hidden="true">{{ $index + 1 }}</span>
            <div>
              <b>{{ step.title }}</b>
              <span>{{ step.description }}</span>
            </div>
          </li>
        }
      </ol>
      <p class="repeat">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17 1l4 4-4 4" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 23l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
        {{ labels.loopRepeat }}
      </p>
    </div>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 48px;
      align-items: start;
      color: var(--mc-dark-text);
    }

    @media (max-width: 900px) {
      :host {
        grid-template-columns: minmax(0, 1fr);
        gap: 32px;
      }
    }

    h2 {
      margin: 10px 0 0;
      font-size: clamp(30px, 4vw, 44px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.08;
    }

    .copy p {
      margin: 16px 0 0;
      color: var(--mc-dark-muted);
      font-size: 16.5px;
    }

    .loop {
      padding: 28px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.35);
      border-radius: 24px;
      background:
        radial-gradient(
          90% 80% at 100% 0%,
          rgba(var(--mc-violet-rgb), 0.3),
          transparent 60%
        ),
        radial-gradient(
          80% 70% at 0% 100%,
          rgba(var(--mc-accent-rgb), 0.14),
          transparent 65%
        ),
        var(--mc-dark-surface);
    }

    ol {
      display: grid;
      margin: 18px 0 0;
      padding: 0;
      list-style: none;
    }

    li {
      position: relative;
      display: grid;
      grid-template-columns: 34px 1fr;
      gap: 14px;
      padding-bottom: 22px;
    }

    li:last-child {
      padding-bottom: 0;
    }

    /* The line from one step to the next. */
    li:not(:last-child)::before {
      content: '';
      position: absolute;
      top: 34px;
      bottom: 0;
      left: 16px;
      width: 2px;
      background: linear-gradient(var(--mc-accent), transparent);
      opacity: 0.5;
    }

    .dot {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      border: 1px solid rgba(var(--mc-accent-rgb), 0.4);
      border-radius: 50%;
      background: rgba(var(--mc-accent-rgb), 0.14);
      color: var(--mc-accent-bright);
      font-family: var(--mc-font-mono);
      font-size: 13px;
      font-weight: 600;
    }

    li b {
      display: block;
      margin-top: 5px;
      font-size: 16px;
    }

    li span:not(.dot) {
      color: var(--mc-dark-muted);
      font-size: 14px;
    }

    .repeat {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 20px 0 0;
      padding-top: 16px;
      border-top: 1px solid var(--mc-dark-line);
      color: var(--mc-dark-muted);
      font-size: 14px;
    }

    svg {
      flex: none;
      width: 18px;
      height: 18px;
      fill: none;
      stroke: var(--mc-accent);
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class CoachingRhythm {
  coaching = input.required<CoachingOffering>();

  protected labels = COACHING_LABELS;
  /* "More than advice," + gradient "a team transformation". */
  protected title = computed(() => this.coaching().philosophyTitle);
  protected paragraphs = computed(() =>
    this.coaching().philosophyContent.split('\n\n'),
  );
}
