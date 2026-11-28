import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { RESOURCE_TOPICS, ResourceTopic } from '@marmicode/resource/core';

/**
 * Pill toggles from `RESOURCE_TOPICS` plus "All topics", with `aria-pressed`.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-topic-filter',
  host: {
    role: 'group',
    'aria-label': 'Filter by topic',
  },
  template: `
    @for (option of options; track option.value) {
      <button
        type="button"
        [attr.aria-pressed]="option.value === value()"
        (click)="value.set(option.value)"
      >
        {{ option.label }}
      </button>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    button {
      all: unset;
      padding: 6px 12px;
      border: 1px solid var(--mc-dark-line-strong);
      border-radius: 999px;
      color: var(--mc-dark-muted);
      font-family: var(--mc-font-sans);
      font-size: 13px;
      cursor: pointer;
      transition:
        border-color 0.2s,
        color 0.2s,
        background 0.2s;
    }

    button:hover {
      color: var(--mc-dark-text);
    }

    button[aria-pressed='true'] {
      border-color: var(--mc-accent);
      background: var(--mc-accent);
      color: var(--mc-dark-bg);
      font-weight: 600;
    }

    button:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 1px;
    }
  `,
})
export class TopicFilter {
  value = model.required<ResourceTopic | null>();

  protected readonly options: Array<{
    value: ResourceTopic | null;
    label: string;
  }> = [{ value: null, label: 'All topics' }, ...RESOURCE_TOPICS];
}
