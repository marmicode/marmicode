import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UpcomingSession } from '@marmicode/workshop/core';

/**
 * One row per session: "DEC 08" date tile, workshop title (with `lang`), "Workshop · Online · 🇬🇧 English · Dec 8–9 · 9:30–18:00 CET".
 * Each row links to the workshop page. Empty list: "No public session scheduled right now." + link to /workshops.
 *
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mc-upcoming-session-list',
  template: `UpcomingSessionList - 🚧 work in progress`,
})
export class UpcomingSessionList {
  sessions = input.required<UpcomingSession[]>();
}
