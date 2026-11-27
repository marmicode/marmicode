import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

export interface SegmentedControlOption<T> {
  value: T;
  label: string;
  /** Decorative, hidden from screen readers. */
  emoji?: string;
}

/**
 * A row of toggle buttons where exactly one is pressed (`aria-pressed`).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-segmented-control',
  host: {
    role: 'group',
    '[attr.aria-label]': 'ariaLabel()',
  },
  template: `
    @for (option of options(); track option.value) {
      <button
        type="button"
        [attr.aria-pressed]="option.value === value()"
        (click)="value.set(option.value)"
      >
        @if (option.emoji) {
          <span aria-hidden="true">{{ option.emoji }}</span>
        }
        {{ option.label }}
      </button>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 2px;
      padding: 4px;
      border: 1px solid var(--mc-dark-line);
      border-radius: 14px;
      background: var(--mc-dark-surface);
    }

    button {
      all: unset;
      padding: 8px 14px;
      border-radius: 10px;
      color: var(--mc-dark-muted);
      font-family: var(--mc-font-sans);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition:
        background 0.2s,
        color 0.2s;
    }

    button:hover {
      color: var(--mc-dark-text);
    }

    button[aria-pressed='true'] {
      background: rgba(255, 255, 255, 0.09);
      box-shadow: inset 0 0 0 1px var(--mc-dark-line-strong);
      color: var(--mc-dark-text);
    }

    button:focus-visible {
      outline: 2px solid var(--mc-accent);
      outline-offset: 1px;
    }
  `,
})
export class SegmentedControl<T> {
  options = input.required<SegmentedControlOption<T>[]>();
  ariaLabel = input.required<string>();
  value = model.required<T>();
}
