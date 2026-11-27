import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Link } from '@marmicode/shared/ui';
import { Training } from '@marmicode/training/core';

/**
 * Dark hero shared by the workshop and cohort pages: breadcrumb, title with the last word in gradient,
 * subheading lines, actions, and an aside card. Nothing about booking: pages project their own content.
 * Slots: `[slot=actions]`, `[slot=aside]` (price card / offer card), `[slot=note]` (OPCO, alternate languages).
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-page-hero',
  template: `TrainingPageHero - 🚧 work in progress`,
})
export class TrainingPageHero {
  training = input.required<Training>();
  /** e.g. [{ label: 'Training', link }, { label: 'Workshops' }] */
  breadcrumb = input.required<Array<{ label: string; link?: Link }>>();
}
