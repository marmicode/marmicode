import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Workshop } from '@marmicode/workshop/core';

/**
 * Slim sticky bar at the bottom: short title, price, **Book a seat** → #sessions.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-book-bar',
  template: `WorkshopBookBar - 🚧 work in progress`,
})
export class WorkshopBookBar {
  workshop = input.required<Workshop>();
  visible = input.required<boolean>();
}
