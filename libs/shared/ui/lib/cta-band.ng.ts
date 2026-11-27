import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Link } from './link.component';

/**
 * Closing call-to-action band: 'solid' (newsletter) or 'dashed' (in-house offer).
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cta-band',
  template: `CtaBand - 🚧 work in progress`,
})
export class CtaBand {
  heading = input.required<string>();
  description = input<string>();
  link = input.required<Link>();
  linkLabel = input.required<string>();
  appearance = input<'solid' | 'dashed'>('solid');
}
