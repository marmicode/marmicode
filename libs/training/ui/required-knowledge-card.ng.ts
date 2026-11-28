import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TrainingLanguage } from '@marmicode/training/core';
import { TRAINING_LABELS } from './training.i18n';

/**
 * "// required knowledge" card with a checklist.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-required-knowledge-card',
  host: {
    class: 'mc-surface',
  },
  template: `
    <h3>// {{ labels().requiredKnowledgeEyebrow }}</h3>
    <ul>
      @for (skill of skills(); track $index) {
        <li>{{ skill }}</li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
      padding: 22px;
      color: var(--mc-dark-text);
    }

    h3 {
      margin: 0 0 14px;
      color: var(--mc-accent);
      font-family: var(--mc-font-mono);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    ul {
      display: grid;
      gap: 10px;
      margin: 0;
      padding: 0;
      color: #d9cfdc;
      font-size: 14.5px;
      list-style: none;
    }

    li {
      display: flex;
      gap: 10px;
    }

    li::before {
      content: '✓';
      color: var(--mc-accent);
      font-weight: 700;
    }
  `,
})
export class RequiredKnowledgeCard {
  skills = input.required<string[]>();
  language = input.required<TrainingLanguage>();

  protected labels = computed(() => TRAINING_LABELS[this.language()]);
}
