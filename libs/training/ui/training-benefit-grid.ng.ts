import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Benefit } from '@marmicode/training/core';

/**
 * 4/2/1-column grid of benefit tiles (icon, title, description).
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-benefit-grid',
  template: `TrainingBenefitGrid - 🚧 work in progress`,
})
export class TrainingBenefitGrid {
  benefits = input.required<Benefit[]>();
}
