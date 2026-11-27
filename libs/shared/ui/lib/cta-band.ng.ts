import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Link, LinkComponent } from './link.component';

/**
 * Closing call-to-action band: 'solid' (newsletter) or 'dashed' (in-house offer).
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-cta-band',
  imports: [LinkComponent],
  template: `
    <div class="text">
      <h2>{{ heading() }}</h2>
      @if (description()) {
        <p>{{ description() }}</p>
      }
    </div>
    <mc-link [link]="link()">{{ linkLabel() }}</mc-link>
  `,
})
export class CtaBand {
  heading = input.required<string>();
  description = input<string>();
  link = input.required<Link>();
  linkLabel = input.required<string>();
  appearance = input<'solid' | 'dashed'>('solid');
}
