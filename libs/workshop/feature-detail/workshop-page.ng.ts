import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Dark workshop page: hero, section tabs, overview, sessions, benefits, testimonials,
 * program, the cook, FAQ, closing section and the sticky booking bar.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-page',
  template: `WorkshopPage - 🚧 work in progress`,
})
export class WorkshopPage {
  workshopId = input.required<string>();
}
