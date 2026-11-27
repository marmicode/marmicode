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
})
export class SegmentedControl<T> {
  options = input.required<SegmentedControlOption<T>[]>();
  ariaLabel = input.required<string>();
  value = model.required<T>();
}
