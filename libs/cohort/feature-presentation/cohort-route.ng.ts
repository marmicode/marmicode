import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Cohort } from '@marmicode/cohort/core';

/**
 * Vertical route of the weeks: number, emoji, title, items, and the `outcome` as "You leave with…".
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cohort-route',
  template: `CohortRoute - 🚧 work in progress`,
})
export class CohortRoute {
  weeks = input.required<Cohort['schedule']['weeks']>();
}
