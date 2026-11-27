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
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-segmented-control',
  template: `SegmentedControl - 🚧 work in progress`,
})
export class SegmentedControl<T> {
  options = input.required<SegmentedControlOption<T>[]>();
  ariaLabel = input.required<string>();
  value = model.required<T>();
}
