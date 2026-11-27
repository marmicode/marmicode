import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Link } from '@marmicode/shared/ui';
import { UpcomingSession, Workshop } from '@marmicode/workshop/core';

/**
 * `sessions`: this workshop's upcoming sessions, each with **Book a seat** → `session.url` (new tab).
 * `otherSessions`: the other-language version's sessions, as dashed rows in that language (`lang`), linking to `otherWorkshopLink`.
 * Both empty: "No session scheduled yet." + custom session link (+ waitlist link when set).
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-workshop-session-list',
  template: `WorkshopSessionList - 🚧 work in progress`,
})
export class WorkshopSessionList {
  workshop = input.required<Workshop>();
  sessions = input.required<UpcomingSession[]>();
  otherSessions = input<UpcomingSession[]>([]);
  /** Built by the page with `workshopRouterHelper`: `ui-detail` can't import `shared/router-helpers`. */
  otherWorkshopLink = input<Link>();
}
