import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Big centered closing section with a glow: eyebrow, projected heading (may use `.mc-gradient-text`),
 * description, and projected actions (`[slot=actions]`).
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-closing-section',
  template: `ClosingSection - 🚧 work in progress`,
})
export class ClosingSection {
  eyebrow = input<string>();
  description = input<string>();
}
