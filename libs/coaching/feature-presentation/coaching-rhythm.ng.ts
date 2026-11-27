import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CoachingOffering } from '@marmicode/coaching/core';

/**
 * Philosophy title + text next to the monthly loop: deep-dive → async support → written report → repeat.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-coaching-rhythm',
  template: `CoachingRhythm - 🚧 work in progress`,
})
export class CoachingRhythm {
  coaching = input.required<CoachingOffering>();
}
