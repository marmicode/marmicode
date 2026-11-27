import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Testimonial } from '@marmicode/training/core';

/**
 * Quote cards; author picture when `authorPictureUri` is set, else decorative initials.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-training-quote-grid',
  template: `TrainingQuoteGrid - 🚧 work in progress`,
})
export class TrainingQuoteGrid {
  testimonials = input.required<Testimonial[]>();
}
